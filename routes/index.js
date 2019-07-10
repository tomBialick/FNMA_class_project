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

//Get the next file id
var file_id;
client.query( 'SELECT * FROM APPRAISAL ORDER BY ID DESC', (error, results) => {
  if (error) {
    throw error;
  }
  if (!results.rows[0]) {
    file_id = 1;
  }
  else {
    file_id = results.rows[0].id;
  }
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
  let address = res.body.address;
  let city = res.body.city;
  let state = res.body.state;
  let zipcode = res.body.zip;
  let borrower = res.body.borrow;
  let owner_of_record = res.body.owner_of_record;
  let county = res.body.county;

  client.query( 'INSERT INTO APPRAISAL (ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER, OWNER_OF_PUBLIC_RECORD, COUNTY) VALUES ($1, $2, $3, $4, $5, $6, $7)', [file_id, address, city, state, zipcode, borrower, owner_of_record, county], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200);
  });
});

router.get('/metrics', function(req, res, next) {
  res.status(200);
});
module.exports = router;
