var Onesignal;
var request = require('request');
var helper = require("../helpers")

Onesignal = function(keys) {
  this.name = "onesignal"
	this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateOnesignalCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    request(this.getOptions(this.keys.app_id), function(err, result) {
    if (result.statusCode === 200) {
      return callback(null, result);
    } else {
      return callback(result.body, null);
    }
    });
  }
  this.validateOnesignalCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		app_id: {
  			type: 'string',
  			required: true,
  			message: 'APP ID IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.getOptions = function(app_id) {
    var options = {
      url: 'https://onesignal.com/api/v1/apps',
      method: 'GET',
      headers: {
       'Authorization': 'Basic ' + this.app_id
      }
    };
  return options;
  }
  return this;
}
module.exports = Onesignal;
