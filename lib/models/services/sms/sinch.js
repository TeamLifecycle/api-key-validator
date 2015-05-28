var Sinch;
var request = require('request');
var helper = require("../helpers");

Sinch = function(keys) {
	this.name = "sinch"
	this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateSinchCall(this.keys);
		if(this.keyErrors.length!=0){
			console.log(this.keyErrors);
			return callback(this.keyErrors, null);
		}
		else{
			return "Basic " + new Buffer("application\\" + this.keys.application_key + ":" + this.keys.application_secret).toString("base64", function(err, resp) {
	      console.log(err,resp)
				return callback(err, resp);
	    });
		}
	}
	this.client = function(){
		var sinchClient = new SinchClient({
        applicationKey: this.keys.application_key,
        capabilities: {messaging: true},
        startActiveConnection: true,
        });
		return sinchClient
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



module.exports = Sinch;
