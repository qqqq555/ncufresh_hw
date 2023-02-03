const express = require('express');
const app = express();
var router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');

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

router.post('/login', function(req, res) {
    let account = req.body.account;
    let password = req.body.password;
    const logIn = 'SELECT * FROM accounts WHERE account = ? AND password = ?';
    if (account && password) {
        db.all(logIn, [account, password], (err, rows) => {
            if (err) {
                res.status(500).send('資料庫錯誤')
            }
            else{
                if(rows.length===0){
                    res.status(401).json({message:"無此帳號"})
                }
                else{
                    res.status(200).json({message:"登入成功"});
                } 
            }
        })
    }
});
module.exports = router;