var express = require('express');
var router = express.Router();

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
