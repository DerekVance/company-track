var express = require('express'),
router = express.Router(),
db = require('monk')(process.env.HOST)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
