const express = require('express');
const app = express();
var router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');
const session = require('express-session');

router.get('', (req, res) => {
    db.all('SELECT * FROM articles', [], (err, rows) => {
        if(err){
            return res.status(500).send({ error: 'An error occurred while retrieving articles'});

        }
        res.send(rows);
    });
});

module.exports = router;