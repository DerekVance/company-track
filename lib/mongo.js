// return all data; only use promises
var errors = require('./errors/errors'),
db = require('monk')(process.env.HOST),
employees = db.get('employees'),
clients = db.get('clients'),
jobs = db.get('jobs');


var newClient = function(attributes) {
  var cFirst = attributes.cFirst,
  cLast = attributes.cLast,
  street = attributes.street,
  city = attributes.city,
  state = attributes.state,
  zip = attributes.zip,
  phone = attributes.phone;

  var clientErrors = errors.clientErrors(cFirst, cLast, street, city, state, zip, phone);
  // console.log(clientErrors);
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
    phone: phone
    });
    return Promise.resolve('client inserted');
  }
};

var newEmployee = function(attributes) {
  var eFirst = attributes.eFirst,
  eLast = attributes.eLast, 
  phone = attributes.phone;

  var employeeErrors = errors.employeeErrors(eFirst, eLast, phone);
  // console.log(employeeErrors);
  if(employeeErrors.length > 0){
    return Promise.resolve(employeeErrors);
  } else {
    employees.insert({
      first: efirst,
      last: elast,
      phone: phone
    });
    return Promise.resolve('employee inserted')
  }

};

var newJob = function(attributes) {
  var cFirst = attributes.cFirst,
      cLast = attributes.cLast,
      type = attributes.type,
      eFirst = attributes.eFirst,
      eLast = attributes.eLast;

  var jobErrors = errors.jobErrors(cFirst, cLast, type, eFirst, eLast);
  console.log(jobErrors);
  if(jobErrors.length > 0){
    return Promise.resolve(jobErrors);
  } else {
    jobs.insert({
      cFirst: cFirst,
      cLast: cLast,
      type: type,
      eFirst: eFirst,
      eLast: eLast
    });
    return Promise.resolve('job inserted')
  }
};


module.exports = {
newClient: newClient,
newEmployee: newEmployee,
newJob: newJob
};
