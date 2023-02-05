const express = require('express');
const app = express();
var router = express.Router();
const md5 = require('md5');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./ncufreshHW.db');
const session = require('express-session');
