var express = require('express');
var router = express.Router();

let conf_data = require('../config.json');

const { Pool, Client } = require('pg');
const pool = new Pool({
  user: conf_data["database"]["username"],
  host: conf_data["database"]["host"],
  database: conf_data["database"]["db"],
  password: conf_data["database"]["password"],
  port: conf_data["database"]["port"],
});
const client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/..', '/public', 'index.html'));
});

router.get('/list', function(req, res, next) {

});

router.get('/list/query', function(req, res, next) {

});

router.get('/house', function(req, res, next) {

});

router.put('/house', function(req, res, next) {

});

router.get('/metrics', function(req, res, next) {

});
module.exports = router;
