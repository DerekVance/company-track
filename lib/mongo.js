// return all data; only use promises
var errors = require('./errors/errors'),
db = require('monk')(process.env.HOST),
employees = db.get('employees'),
clients = db.get('clients'),
jobs = db.get('jobs');


function newClient(attributes) {
  var cFirst = attributes.cFirst,
  cLast = attributes.cLast,
  street = attributes.street,
  city = attributes.city,
  state = attributes.state,
  zip = attributes.zip,
  phone = attributes.phone;

  var clientErrors = errors.clientErrors(cFirst, cLast, street, city, state, zip, phone);
  if (clientErrors.length > 0){
    return Promise.resolve(clientErrors);
  } else {
    clients.insert({
    first: cFirst,
    last: cLast,
    street: street,
    city: city,
    state: state,
    zip: zip,
    phone: phone,
    jobs: []
    });
    return Promise.resolve('client inserted');
  }
};

function newJob(attributes, clientId) {
  // console.log(attributes, client.id);
  var type = attributes.type,
    crew = attributes.employees,
    clientId = clientId.id,
    client = {};

  var jobErrors = errors.jobErrors(type, crew);

  if(jobErrors.length > 0){
    return clients.findOne({ _id: clientId }).then(function(client){
      client.errors = jobErrors
      return client;
    });
  } else {
    jobs.insert({
      client: clientId,
      type: type,
      crew: crew
    }).then(function(job){
      // console.log(job);
      clients.update(
        { _id: clientId },
        { $push: { jobs: job._id } }
      )
  })
  return Promise.resolve('client updated')
  }
};

function getAllClients() {
  return clients.find({}).then(function(clients){
    // console.log(clients);
    return clients;
  })
};

function getClient(clientId) {
  var client = {};
  return clients.findOne({ _id: clientId }).then(function(client){
    // console.log(client);
    return jobs.find( { client: clientId } ).then(function (jobs) {
      // console.log(jobs);
      client.jobs = jobs
      return client
    })
  })
};

function getEmployee() {
  // body...
};

function getJob() {
  // body...
};


module.exports = {
newClient: newClient,
newJob: newJob,
getAllClients: getAllClients,
getClient: getClient,
employees: employees
};
