'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../connectDatabase/db')

module.exports = {
    detail: (req, res) => {
        let userRec = req.params.UserIdRec
        let userSend = req.params.UserIdSend
        let sql = 'SELECT * FROM message WHERE (UserIdSend = ? AND UserIdRec = ?) OR (UserIdRec = ? AND UserIdSend = ?)'
        db.query(sql, [userSend, userRec, userSend, userRec], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO message SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    getAllMessage: (req, res) => {
        let sql = 'SELECT * FROM message m JOIN messagenew mn ON m.messageId = mn.messageId JOIN user ON mn.UserIdSend = user.UserId WHERE mn.UserIdRec = ?'
        db.query(sql, [req.params.UserIdRec], (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    
}