var express = require('express');
var router = express.Router();

let conf_data = require('../config.json');

const promise = require('bluebird');
const initOptions = {
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);
const db = pgp({
  user: conf_data["database"]["username"],
  host: conf_data["database"]["host"],
  database: conf_data["database"]["db"],
  //password: conf_data["database"]["password"],
  port: conf_data["database"]["port"],
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/..', '/public', 'index.html'));
});

router.get('/list', function(req, res, next) {
  db.query( 'SELECT * FROM APPRAISAL ORDER BY ID ASC').then(results => {
    console.log(results)
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
  })
//  res.status(200);
});

router.get('/list/query', function(req, res, next) {
  res.status(200).send({"Ok"});
});

router.get('/houseform', function(req, res, next) {

  res.status(200).send({"Ok"});;
});

router.post('/house', function(req, res, next) {
  //Get the next file id
  var file_id;
  db.query( 'SELECT * FROM APPRAISAL ORDER BY ID DESC').then(results => {
    console.log(results)
    if (!results[0]) {
      file_id = 1;
      console.log("File id is " + file_id)
    }
    else {
      file_id = results[0].id + 1;
      console.log("File id is " + file_id)
    }
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zip;
    let borrower = req.body.borrow;
    let owner_of_record = req.body.owner_of_record;
    let county = req.body.county;

    db.query( 'INSERT INTO APPRAISAL (ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER, OWNER_OF_PUBLIC_RECORD, COUNTY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [file_id, address, city, state, zipcode, borrower, owner_of_record, county]).then(results => {
      res.status(200).send({"Appraisal form successully added"});;
    }).catch(error => {
      console.log('ERROR:', error);
    })
  }).catch(error => {
    console.log('ERROR:', error);
  })

  //console.log(req.body)
});

router.get('/metrics', function(req, res, next) {
  res.status(200).send({"Ok"});;
});
module.exports = router;
