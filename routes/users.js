var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.put('/create', function(req, res, next) {
  res.status(200).send({"Ok"});;
});

router.get('/verify', function(req, res, next) {
  res.status(200).send({"Ok"});;
});

module.exports = router;
