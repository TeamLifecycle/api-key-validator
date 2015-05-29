var Onesignal;
var request = require('request');
var helper = require("../helpers")

Onesignal = function(keys) {
  this.name = "onesignal"
	this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateOnesignalCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
    request(this.getOptions(), function(err, result) {
    if (result.statusCode === 200) {
      return callback(null, result);
    } else {
      return callback(result, null);
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
      api_key: {
  			type: 'string',
  			required: true,
  			message: 'API KEY IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.getOptions = function() {
    var options = {
      url: 'https://onesignal.com/api/v1/players?app_id=' + this.keys.app_id,
      method: 'GET',
      headers: {
       'Authorization': 'Basic ' + this.keys.api_key
      }
    };
  return options;
  }
  return this;
}
module.exports = Onesignal;
