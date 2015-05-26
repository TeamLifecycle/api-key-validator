var Sinch;
var request = require('request');
var helper = require("../helpers")


Sinch = function(keys) {
  	this.name = "sinch"
  	this.keys = keys;
    this.validate = function(callback) {
      this.keyErrors = helper.validateSinchCall(this.keys);
  		if(this.keyErrors.length!=0){
  			console.log(this.keyErrors);
  			return callback(this.keyErrors, null);
  		}
      request(this.getOptions(this.keys.application_key, this.keys.application_secret), function(err, result) {
        if (result.statusCode === 200) {
          return callback(null, result);
        } else {
          return callback(result.body, null);
        }
    });
    };
  this.getOptions = function(key, secret, message) {
    var options = {
      url: 'https://messagingapi.sinch.com/v1/sms/+',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      'auth': {
        'user': key,
        'pass': secret
      },
      body: {
        message: message
      }
    };
  return options;
  }
  return this;
}
module.exports = Sinch
