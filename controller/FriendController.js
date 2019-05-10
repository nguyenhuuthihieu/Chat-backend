'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../connectDatabase/db')

module.exports = {
    getFriend: async (req, res) => {
        let sql = 'SELECT * FROM relationship  WHERE (UserIdRec = ? OR UserIdSend = ?)AND state = 1'
        let r = [];
        let resp = new Array();
        await db.query(sql, [req.params.UserId, req.params.UserId], (err, response) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            // let resp = new Array();
            if (response == []){
                res.json({message : 'Chưa có bạn bè'})
                console.log('k có bạn bè')
            }else {
                let s = 'SELECT * FROM user  WHERE UserId = ?'
                response.forEach(async (element) => {
                    if(element.UserIdRec == req.params.UserId){
                        await db.query(s, [element.UserIdSend], (err, response) => {
                            if (err) throw err
                            resp.push(response[0])
                            let a = resp
                            console.log('ban',response)
                        })
                    }else{
                        console.log(element)
                        await db.query(s, [element.UserIdRec], (err, response) => {
                            if (err) throw err
                            resp.push(response[0])
                            let a = resp
                            console.log('bạn',response)
                        })
                    }
                        console.log('resp', resp) 
                })  
                
                var callback = setInterval(function () { 
                    if (resp.length == response.length) { 
                        res.json(resp)
                        clearInterval(callback)
                        return;
                    } 
                }, 200); 
            }
        })
    },
    getNotFriend: async (req, res) => {
        let sql = 'SELECT * FROM relationship  WHERE UserIdRec = ? OR UserIdSend = ?'
        let r = [];
        let resp = new Array();
        await db.query(sql, [req.params.UserId, req.params.UserId], (err, response) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            // let resp = new Array();
            if (response == []){
                res.json({message : 'Chưa có bạn bè'})
                console.log('k có bạn bè')
            }else {
                let s = 'SELECT * FROM user  WHERE UserId = ?'
                response.forEach(async (element) => {
                    if(element.UserIdRec == req.params.UserId){
                        await db.query(s, [element.UserIdSend], (err, response) => {
                            if (err) throw err
                            resp.push(response[0].UserId)
                        })
                    }else{
                        console.log(element)
                        await db.query(s, [element.UserIdRec], (err, response) => {
                            if (err) throw err
                            resp.push(response[0].UserId)
                        })
                    }
                        console.log('resp', resp) 
                })  
                let s2 = 'SElECT * FROM user WHERE UserId NOT IN (?)'
                var callback = setInterval(async function () { 
                    if (resp.length == response.length) { 
                        await resp.push(req.params.UserId)
                        await db.query(s2, [resp], (err, response) => {
                            if (err) throw err
                            res.json(response)
                        })
                    }
                    clearInterval(callback)
                    return;
                }, 200); 
            }
        })
    },
    getSendRequestFriend: (req, res) => {
        let sql = 'SELECT * FROM relationship WHERE UserIdSend = ? AND state = 0';
        db.query (sql, [req.params.UserId], (err, response) => {
            if(err) throw err
            res.json(response)
        })
    },
    getOtherUser: (req, res) => {
        let sql = 'SELECT * FROM user u FULL OUTER JOIN relationship r ON u.UserId = r.UserIdSend FULL OUTER JOIN relationship r ON u.UserId = r.UserIdRec';
        db.query (sql, [req.params.UserId], (err, response) => {
            if(err) throw err
            res.json(response)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO relationship SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    getRequestFriend: (req, res) => {
        let sql = 'SELECT * FROM relationship WHERE UserIdRec = ? AND state = 0';
        db.query (sql, [req.params.UserId], (err, response) => {
            if(err) throw err
            res.json(response)
        })
    },
    confirmFriend : (req, res) => {
        let sql = 'UPDATE relationship SET state = TRUE WHERE UserIdRec = ? AND UserIdSend = ?'
        db.query (sql, [req.params.UserIdRec, req.params.UserIdSend], (err, response) => {
            if(err) throw err
            res.json({message:'Xác nhận thành công'})
        })
    },
    removeRequestFriend : (req, res) => {
        let sql = 'DELETE FROM relationship WHERE UserIdRec = ? AND UserIdSend = ?'
        db.query (sql, [req.params.UserIdRec, req.params.UserIdSend], (err, response) => {
            if(err) throw err
            res.json({message:'Hủy xác nhận thành công'})
        })
    },
    deleteFriend : (req, res) => {
        let UserRec = req.params.UserIdRec
        let UserSend = req.params.UserIdSend
        let sql = 'DELETE FROM relationship WHERE (UserIdRec = ? AND UserIdSend = ?) OR (UserIdSend = ? AND UserIdRec = ?)'
        db.query (sql, [UserRec, UserSend, UserRec, UserSend], (err, response) => {
            if(err) throw err
            res.json({message:'Hủy xác nhận thành công'})
        })
    },
}