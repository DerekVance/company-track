var express = require('express'),
router = express.Router(),
mongo = require('../lib/mongo');

//one function per route
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comapny Management Tool' });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Company Management Tool' });
});

router.get('/show', function(req, res, next) {
  res.render('show');
});

router.get('/new-client', function(req, res, next){
  res.render('new-client');
});

router.get('/new-employee', function(req, res, next){
res.render('new-employee');
});

router.get('/new-job', function(req, res, next){
res.render('new-job');
});

router.get('/edit', function(req, res, next){
  res.render('edit');
});

router.post('/new-client', function(req, res, next){
  mongo.newClient(req.body).then(function(errors){
    if(errors === 'client inserted') {
      res.redirect('show');
    } else {
      console.log(errors);
      res.render('new-client', { errors: errors });
    };
  });
});

router.post('/new-employee', function(req, res, next){
  mongo.newEmployee(req.body).then(function(errors){
    if(errors === 'employee inserted') {
      res.redirect('show');
    } else {
      console.log(errors);
      res.render('new-employee', { errors: errors });
    }
  })
})

router.post('/new-job', function(req,res, next){
  mongo.newJob(req.body).then(function(errors){
    if(errors === 'job inserted') {
      res.redirect('show');
    } else {
      console.log(errors);
      res.render('new-job', { errors: errors });
    }
  })
});

router.post('/edit', function(req, res, next){
  res.redirect('show');
});

router.post('/delete', function (req, res, next) {
  res.redirect('show');
});
module.exports = router;
