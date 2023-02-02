const express = require('express');
const app = express();
var router = express.Router();
const cors = require('cors');
app.use(cors());


const sqlite3 = require('sqlite3').verbose();

router.post('http://localhost:3000/signup', (req, res) => {
    const db = new sqlite3.Database('../ncufreshHW.db');
    const account = req.body.signA;
    const password = req.body.password;
    const sql = 'INSERT INTO accounts(account, password) VALUES(?, ?)';
    db.run(sql, [account, password], (err) => {
        if(err){
            return res.status(500).json({
                error: 'Failed to register user'
            });
        }
    });
    db.close();
})
module.exports = router;