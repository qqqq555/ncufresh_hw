var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var accountsRouter = require('./routes/accounts');
var articlesRouter = require('./routes/articles');
var app = express();
const {json} = require('body-parser');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');

app.use(session({
    secret: 'thisissecrettttt',
    resave: true,
    saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/accounts', accountsRouter);
app.use('/articles', articlesRouter);


app.post('/login', function(req, res) {
    let account = req.body.account;
    let password = req.body.password;
    let enPassword = md5(password);
    const logIn = 'SELECT * FROM accounts WHERE account = ? AND password = ?';
    if (account && enPassword) {
        db.all(logIn, [account, enPassword], (err, rows) => {
            if (err) {
                res.status(500).send('資料庫錯誤')
            }
            else{
                if(rows.length===0){
                    res.status(401).json({message:"無此帳號"})
                }
                else{
                    console.log("Hello");
                    req.session.login = true;
                    req.session.account = account;
                    const token = jwt.sign({account:account},
                        'thisissecrettttt',
                        {expiresIn: '1h'}
                    );
                    console.log(token);
                    res.status(200).json({token:token});
                } 
            }
        })
    }
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.clearCookie('jwt');
    res.status(200).send('success');
    
});

module.exports = app;
