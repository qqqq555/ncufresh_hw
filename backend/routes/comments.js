const express = require('express');
const app = express();
var router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');
const session = require('express-session');

router.get('/:id', (req, res) => {
    db.all('SELECT * FROM comments WHERE id = ?', [req.params.id], (err, rows) => {
        if(err){
            return res.status(500).send;
        }
        res.send(rows);
    });
});

router.post('/:id/:account', (req, res) => {
    const words = req.body.words;
    const sql = `INSERT INTO comments (id, account, words) VALUES (?, ?, ?)`;
    db.run(sql, [req.params.id, req.params.account, words], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to add comment' });
      } else {
        res.json({ success: true });
      }
    });
  });

module.exports = router;