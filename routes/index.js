var express = require('express'),
router = express.Router(),
mongo = require('../lib/mongo');

//one function per route
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comapny Management Tool' });
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.get('/show', function(req, res, next) {
  res.render('show');
});

router.post('/new', function(req, res, next){
  res.redirect('show');
});

router.get('/edit', function(req, res, next){
  res.render('edit');
});

router.post('/edit', function(req, res, next){
  res.redirect('show');
});

router.post('/delete', function (req, res, next) {
  res.redirect('show');
});
module.exports = router;
