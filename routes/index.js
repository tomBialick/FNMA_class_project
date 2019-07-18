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
  password: conf_data["database"]["password"],
  port: conf_data["database"]["port"],
});

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
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

    let address = req.body.property_address? req.body.property_address: "";
    let city = req.body.city? req.body.city: "";
    let state = req.body.state? req.body.state: "";
    let zipcode = req.body.zip_code? req.body.zip_code: "";
    let borrower = req.body.borrower? req.body.borrower: "";
    let owner_of_record = req.body.owner_of_record? req.body.owner_of_record: "";
    let county = req.body.county? req.body.county: "";
    let legal_desc = req.body.legal_desc? req.body.legal_desc: "";
    let assess_par_num = req.body.assess_par_num? req.body.assess_par_num: "";
    let tax_year = req.body.tax_year? req.body.tax_year: "";
    let r_e_taxes = req.body.r_e_taxes? req.body.r_e_taxes: "";
    let neighborhood = req.body.neighborhood? req.body.neighborhood: "";
    let map_ref = req.body.map_ref? req.body.map_ref: "";
    let census_tract = req.body.census_tract? req.body.census_tract: "";
    let occupant = req.body.occupant? req.body.occupant: "";
    let spec_assess = req.body.spec_assess? req.body.spec_assess: "";
    let pud = req.body.pud? req.body.pud: "";
    let hoa_dues = req.body.hoa_dues? req.body.hoa_dues: "";
    let hoa_freq = req.body.hoa_freq? req.body.hoa_freq: "";
    let prop_rights_appr = req.body.prop_rights_appr? req.body.prop_rights_appr: "";
    let assign_type = req.body.assign_type? req.body.assign_type: "";
    let lender_client = req.body.lender_client? req.body.lender_client: "";
    let l_c_address = req.body.l_c_address? req.body.l_c_address: "";
    let for_sale = req.body.for_sale? req.body.for_sale: "";
    let data_sources = req.body.data_sources? req.body.data_sources: "";

    db.query('INSERT INTO APPRAISAL ( ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER, OWNER_OF_PUBLIC_RECORD, COUNTY, LEGAL_DESCRIPTION, ASSESSOR_PARCEL_NUM, TAX_YEAR, R_E_TAXES, NEIGHBORHOOD_NAME, MAP_REFERENCE, CENSUS_TRACT, OCCUPANT, SPECIAL_ASSESSMANTS, PUD, HOA, HOA_PAY_FREQ, PROPERTY_RIGHTS_APPRAISED, ASSIGNMENT_TYPE, LENDER_CLIENT, L_C_ADDRESS, FOR_SALE_YES_NO, REPORT_DATA_SOURCES) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)', [file_id, address, city, state, zipcode, borrower, owner_of_record, county, legal_desc, assess_par_num, tax_year, r_e_taxes, neighborhood, map_ref, census_tract, occupant, spec_assess, pud, hoa_dues, hoa_freq, prop_rights_appr, assign_type, lender_client, l_c_address, for_sale, data_sources]).then(results => {
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
  let property_address = req.body.property_address? req.body.property_address: "";
  let city = req.body.city? req.body.city: "";
  let state = req.body.state? req.body.state: "";
  let zip_code = req.body.zip_code? req.body.zip_code: "";
  let borrower = req.body.borrower? req.body.borrower: "";
  let owner_of_record = req.body.owner_of_record? req.body.owner_of_record: "";
  let county = req.body.county? req.body.county: "";
  let legal_desc = req.body.legal_desc? req.body.legal_desc: "";
  let assess_par_num = req.body.assess_par_num? req.body.assess_par_num: "";
  let tax_year = req.body.tax_year? req.body.tax_year: "";
  let r_e_taxes = req.body.r_e_taxes? req.body.r_e_taxes: "";
  let neighborhood = req.body.neighborhood? req.body.neighborhood: "";
  let map_ref = req.body.map_ref? req.body.map_ref: "";
  let census_tract = req.body.census_tract? req.body.census_tract: "";
  let occupant = req.body.occupant? req.body.occupant: "";
  let spec_assess = req.body.spec_assess? req.body.spec_assess: "";
  let pud = req.body.pud? req.body.pud: "";
  let hoa_dues = req.body.hoa_dues? req.body.hoa_dues: "";
  let hoa_freq = req.body.hoa_freq? req.body.hoa_freq: "";
  let prop_rights_appr = req.body.prop_rights_appr? req.body.prop_rights_appr: "";
  let assign_type = req.body.assign_type? req.body.assign_type: "";
  let lender_client = req.body.lender_client? req.body.lender_client: "";
  let l_c_address = req.body.l_c_address? req.body.l_c_address: "";
  let for_sale = req.body.for_sale? req.body.for_sale: "";
  let data_sources = req.body.data_sources? req.body.data_sources: "";

  db.query( 'UPDATE APPRAISAL SET PROPERTY_ADDRESS = $2, CITY = $3, STATE = $4, ZIP_CODE = $5, BORROWER = $6, OWNER_OF_PUBLIC_RECORD = $7, COUNTY = $8, LEGAL_DESCRIPTION = $9, ASSESSOR_PARCEL_NUM = $10, TAX_YEAR = $11, R_E_TAXES = $12, NEIGHBORHOOD_NAME = $13, MAP_REFERENCE = $14, CENSUS_TRACT = $15, OCCUPANT = $16, SPECIAL_ASSESSMANTS = $17, PUD = $18, HOA = $19, HOA_PAY_FREQ = $20, PROPERTY_RIGHTS_APPRAISED = $21, ASSIGNMENT_TYPE = $22, LENDER_CLIENT = $23, L_C_ADDRESS = $24, FOR_SALE_YES_NO = $25, REPORT_DATA_SOURCES = $26 WHERE ID = $1', [file_id, property_address, city, state, zip_code, borrower, owner_of_record, county, legal_desc, assess_par_num, tax_year, r_e_taxes, neighborhood, map_ref, census_tract, occupant, spec_assess, pud, hoa_dues, hoa_freq, prop_rights_appr, assign_type, lender_client, l_c_address, for_sale, data_sources]).then(results => {
    res.status(200).send("Appraisal form successully updated");
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* DELETE an Appraisal */
router.delete('/house/delete', function(req, res, next) {
  let file_id = req.body.id;
  db.query( 'DELETE FROM APPRAISAL WHERE ID = $1', [file_id]).then(results => {
    res.status(200).send("Appraisal successully deleted");
  }).catch(error => {
    console.log('ERROR:', error);
    res.status(400).send("Bad Request");
  })
});

/* POST a file to the s3 bucket */
router.post('/file', function(req, res, next) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('Error uploading file');
  }
  let fileObj = req.files.file;
  let fileName = fileObj.name;
  let id = req.body.id;
  let keyName = id + "_" + fileName;
  console.log(keyName);
  fileObj.mv('./resources/' + fileName, function(err) {
    if (err) {
      console.log(err)
      res.status(500).send("Internal Error Storing File");
    }
    let file_loc = './resources/' + fileName;
    fs.readFile(file_loc, (err, data) => {
       if (err) throw err;
       const params = {
           Bucket: conf_data["s3"]["bucketName"], // pass your bucket name
           Key: keyName, // file will be saved as clippybucket2019/<keyName>
           Body: JSON.stringify(data, null, 2)
       };
       s3.upload(params, function(s3Err, data) {
           if (s3Err) throw s3Err
           let file_location = data.Location;
           db.query( 'UPDATE APPRAISAL SET ATTACHMENT_NAME = $2, ATTACHMENT_LOCATION  $3 WHERE ID = $1', [id, keyName, file_location]).then(results => {
           console.log(`File uploaded successfully at ${data.Location}`)
           res.status(200).send("File successully uploaded");
       });
     });
   });
  });
})

router.get('/metrics', function(req, res, next) {
  res.status(200).send("Ok");
});

module.exports = router;
