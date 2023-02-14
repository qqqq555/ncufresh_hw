const express = require('express');
const app = express();
var router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');
const session = require('express-session');
const jwt = require('jsonwebtoken');

router.get('', (req, res) => {
    db.all('SELECT * FROM articles', [], (err, rows) => {
        if(err){
            return res.status(500).send({ error: 'An error occurred while retrieving articles'});

        }
        res.send(rows);
    });
});

router.get('/:account', (req, res) => {
    db.all('SELECT * FROM articles WHERE account = ?', [req.params.account], (err, rows) => {
        if(err){
            return res.status(500).send;
        }
        res.send(rows);
    });
});

router.post('/post', (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, 'thisissecrettttt', function(err, decoded) {
        if(err){
            res.status(201).json({message:"沒登入"})
        }
        else{
            db.run('INSERT INTO articles (account, title, words) VALUES (?,?,?)',[decoded.account, req.body.title, req.body.words], 
            function(err){
                if(err){
                    res.status(500).send
                }
                else{
                    res.status(200).send
                }
            })
        }
    });
});

router.delete('/:id', (req, res) => {
    const id=req.params.id;
    console.log(id);
    db.run('DELETE FROM articles WHERE id = ?', [id], function(err) {
        if(err){
            return res.status(500).send
        }
        else{
            res.status(200).send
        }
    })
});
module.exports = router;