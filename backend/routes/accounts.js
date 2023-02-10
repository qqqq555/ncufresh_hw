const express = require('express');
const app = express();
var router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');
const session = require('express-session');


router.post('/signup', function(req,res,next){
    let account = req.body.account;
    let password = req.body.password;
    const check = 'SELECT * FROM accounts WHERE account = ?';
    const signUp = 'INSERT INTO accounts(account, password) VALUES(?, ?)';
    db.get(check,[account],(err,row)=>{
        if(err){
            res.status(500).json({message:"資料庫錯誤"})
        }
        else{
            if(row){
                res.status(201).json({message:"帳號已經存在"})
            }
            else{
                db.run(signUp,[account,password],(err)=>{
                    if(err){
                        res.status(500).json({message:"資料庫錯誤"})
                    }
                    else{
                        res.status(200).json({message:"註冊成功"})
                    }
                })
            }
        }
    })
})



module.exports = router;