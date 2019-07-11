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

/* GET a list of all Appraisals */
router.get('/list', function(req, res, next) {
  db.query( 'SELECT * FROM APPRAISAL ORDER BY ID ASC').then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
//  res.status(200);
});

/* GET a list of all Appraisals with the given file_id (only one) */
router.get('/list/query/byID', function(req, res, next) {
  var queryItem = req.query.id;
  db.query( 'SELECT * FROM APPRAISAL WHERE ID = $1 ORDER BY ID ASC', [queryItem]).then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* GET a list of all Appraisals with the given street address */
router.get('/list/query/byAddress', function(req, res, next) {
  var queryItem = req.query.address;
  db.query( 'SELECT * FROM APPRAISAL WHERE PROPERTY_ADDRESS = $1 ORDER BY ID ASC', [queryItem]).then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* GET a list of all Appraisals with the given borrower */
router.get('/list/query/byBorrower', function(req, res, next) {
  var queryItem = req.query.borrower;
  db.query( 'SELECT * FROM APPRAISAL WHERE BORROWER = $1 ORDER BY ID ASC', [queryItem]).then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});


/* GET a list of all Appraisals with the given city */
router.get('/list/query/byCity', function(req, res, next) {
  var queryItem = req.query.city;
  db.query( 'SELECT * FROM APPRAISAL WHERE CITY = $1 ORDER BY ID ASC', [queryItem]).then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* GET a list of all Appraisals with the given zip code */
router.get('/list/query/byZip', function(req, res, next) {
  var queryItem = req.query.zip;
  db.query( 'SELECT * FROM APPRAISAL WHERE ZIP_CODE = $1 ORDER BY ID ASC', [queryItem]).then(results => {
    res.status(200).send(results)
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* GET a specific form

REMOVED since it is redundant. Use get /list/query/byID to get a specific house
Or post /house/update to change a record

router.get('/form', function(req, res, next) {

  res.status(200).send("Ok");;
});
*/

/* POST a new Appraisal */
router.post('/house', function(req, res, next) {
  //Get the next file id
  var file_id;
  db.query( 'SELECT * FROM APPRAISAL ORDER BY ID DESC').then(results => {
    if (!results[0]) {
      file_id = 1;
    }
    else {
      file_id = results[0].id + 1;
    }
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zip;
    let borrower = req.body.borrow;
    let owner_of_record = req.body.owner_of_record;
    let county = req.body.county;

    db.query( 'INSERT INTO APPRAISAL (ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER, OWNER_OF_PUBLIC_RECORD, COUNTY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [file_id, address, city, state, zipcode, borrower, owner_of_record, county]).then(results => {
      res.status(200).send("Appraisal form successully added");
    }).catch(error => {
      console.log('ERROR:', error);
      res.status(400).send("Bad Request");
    })
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(500).send("Issue Connecting to Database");
  })
});

/* POST an updated Appraisal */
router.post('/house/update', function(req, res, next) {
  let file_id = req.body.id;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let zipcode = req.body.zip;
  let borrower = req.body.borrow;
  let owner_of_record = req.body.owner_of_record;
  let county = req.body.county;

  db.query( 'UPDATE APPRAISAL SET ID = $1, PROPERTY_ADDRESS = $2, CITY = $3, STATE = $4, ZIP_CODE = $5, BORROWER = $6, OWNER_OF_PUBLIC_RECORD = $7, COUNTY = $8', [file_id, address, city, state, zipcode, borrower, owner_of_record, county]).then(results => {
    res.status(200).send("Appraisal form successully updated");
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});



router.get('/metrics', function(req, res, next) {
  res.status(200).send("Ok");
});

module.exports = router;
