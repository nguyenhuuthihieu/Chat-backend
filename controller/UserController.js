'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../connectDatabase/db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM user'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM user WHERE UserId = ?'
        db.query(sql, [req.params.UserId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let UserId = req.params.UserId;
        let sql = 'UPDATE user SET ? WHERE id = ?'
        db.query(sql, [data, UserId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO user SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM user WHERE id = ?'
        db.query(sql, [req.params.UserId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    },
    login: (req, res) => {
        let sql = 'SELECT * from user where Email = ?'
        db.query(sql, [req.params.Email], (err, response) => {
            if (err) throw err
            if(response == []) {
                res.json({message : 'EMAIL HOẶC MẬT KHẨU KHÔNG HỢP LỆ'})
            }else {
                res.json ({user : response[0], message:''})
            }
        })
    }
}