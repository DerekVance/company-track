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
    if(typeof crew === 'string'){
      crew = [crew]
    }
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

function getAllClientData() {
  var allClients = clients.find({});
  var allJobs = jobs.find({});
  return Promise.all([allClients, allJobs]).then(function(allData){
    allData[0].forEach(function(client, index){
      client.jobDescription = []
      allData[1].forEach(function(job, index){
        if(job.client === client._id.toString()){
          client.jobDescription.push(job)
        }
      })
    })
    return allData[0]
  });
};

function getClient(clientId) {
  return clients.findOne({ _id: clientId }).then(function(client){
    return jobs.find( { client: clientId } ).then(function (jobs) {
      client.jobs = jobs
      return client
    })
  })
};



module.exports = {
  newClient: newClient,
  newJob: newJob,
  getAllClientData: getAllClientData,
  getClient: getClient
};
