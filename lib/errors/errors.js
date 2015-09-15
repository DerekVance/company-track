var clientErrors = function(cFirst, cLast, street, city, state, zip, phone){
  var arr = [];

  if(cFirst.trim() === '') {
    arr.push('Client first name can not be blank');
  }
  if(cLast.trim() === '') {
    arr.push('Client last name can not be blank');
  }
  if(street.trim() === '') {
    arr.push('Client street can not be blank');
  }
  if(city.trim() === '') {
    arr.push('Client city can not be blank');
  }
  if(state.trim() === '') {
    arr.push('Client state can not be blank');
  }
  if(zip.trim() === '') {
    arr.push('Client zip can not be blank');
  }
  if(phone.trim() === '') {
    arr.push('Phone number can not be blank');
  }
  if(phone.length != 10) {
    arr.push('Phone number must be 10 digits')
  }
  return arr;
};

var jobErrors = function(type, crew) {
  var arr = [];

  if(type === 'none'){
    arr.push('You must select a job type')
  }
  if(crew === undefined){
    arr.push('You must have at least one employee assigned to job')
  }
  return arr;
};

module.exports = {
  clientErrors: clientErrors,
  jobErrors: jobErrors
};
