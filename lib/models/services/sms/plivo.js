var plivo = require('plivo-node');
var Plivo;
var request = require('request');
var helper = require("../helpers")

Plivo = function(keys){
	this.name = "plivo";
	this.keys = keys;
	this.validate = function(callback) {
		this.keyErrors = this.validatePlivoCall(this.keys);
		if(this.keyErrors.length!=0){
			console.log(this.keyErrors);
			return callback(this.keyErrors, null);
		}
		request(this.getOptions(this.keys.auth_id, this.keys.auth_token), function(err, result) {
		if (result.statusCode!=200) {
			console.log(result.statusCode)
			return callback(result.body, null);
		}
		else return callback(null, result);
	});
	}
	this.validatePlivoCall = function(keys){
		var schema = require('validate');
		var user = schema({
			auth_id: {
				type: 'string',
				required: true,
				message: 'AUTH ID IS REQUIRED'
			},
			auth_token: {
				type: 'string',
				required: true,
				message: 'AUTH TOKEN IS REQUIRED'
			},
		});
		return user.validate(keys)
	}

	this.getOptions = function(auth_id, auth_token) {
		var options = {
			url: 'https://api.plivo.com/v1.Account/',
			method: 'GET',
			auth : {
      	'user': auth_id,
				'pass': auth_token,
				'sendImmediately' : false
      }
		};
	return options;
	}
	return this;
  };

module.exports = Plivo;
