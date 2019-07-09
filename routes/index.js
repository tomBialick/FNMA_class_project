var express = require('express');
var router = express.Router();

let conf_data = require('../config.json');

const { Client } = require('pg');
const client = new Client({
  user: conf_data["database"]["username"],
  host: conf_data["database"]["host"],
  database: conf_data["database"]["db"],
  password: conf_data["database"]["password"],
  port: conf_data["database"]["port"],
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/..', '/public', 'index.html'));
});

router.get('/list', function(req, res, next) {
  res.status(200);
});

router.get('/list/query', function(req, res, next) {
  res.status(200);
});

router.get('/house', function(req, res, next) {
  res.status(200);
});

router.put('/house', function(req, res, next) {
  res.status(200);
});

router.get('/metrics', function(req, res, next) {
  res.status(200);
});
module.exports = router;
