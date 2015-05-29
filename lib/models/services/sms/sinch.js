var request = require('request');
var helper = require("../helpers");

var Sinch = function(keys) {
	this.name = "sinch"
	this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateSinchCall(this.keys);
		if(this.keyErrors.length!=0){
			return callback(this.keyErrors, null);
		}
		request(this.getOptions(this.keys.application_key, this.keys.application_secret), function(err, result) {
      if (result.statusCode!=200) {
        return callback(result.body, null);
      }
      else return callback(null, result);
    });
	}
  this.validateSinchCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		application_key: {
  			type: 'string',
  			required: true,
  			message: 'APPLICATION KEY IS REQUIRED'
  		},
  		application_secret : {
  			type: 'string',
  			required: true,
  			message: 'APPLICATION SECRET IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.getOptions = function(key, secret) {
    var options = {
      url: 'https://messagingApi.Sinch.com/v1/message/status/1234',
      method: 'GET',
      'auth': {
        'user': key,
        'pass': secret
      }
    };
  return options;
  }
  return this;
}



module.exports = Sinch;
