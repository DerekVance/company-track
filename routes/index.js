var express = require('express'),
router = express.Router(),
mongo = require('../lib/mongo');

//one function per route
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Company Management Tool' });
});

router.get('/show', function(req, res, next) {
  mongo.getAllClients().then(function(clients){
  res.render('show', { clients: clients });
  })
});

router.get('/show-client/:id', function(req, res, next){
  mongo.getClient(req.params.id).then(function(client){
    console.log(client);
    res.render('show-client', {client: client})
  })
})

router.get('/new-client', function(req, res, next){
  res.render('new-client');
});

router.get('/edit', function(req, res, next){
  res.render('edit');
});

router.post('/new-client', function(req, res, next){
  mongo.newClient(req.body).then(function(errors){
    if(errors === 'client inserted') {
      res.redirect('show');
    } else {
      res.render('new-client', { errors: errors });
    };
  });
});

router.post('/add-job/:id', function(req, res, next) {
  mongo.newJob(req.body, req.params).then(function(client){
    if(client === 'client updated'){
      res.redirect('/show-client/' + req.params.id);
    } else {
      res.render('show-client', {client: client})
    }
  })
})

router.post('/edit', function(req, res, next){
  res.redirect('show');
});

router.post('/delete', function (req, res, next) {
  res.redirect('show');
});
module.exports = router;
