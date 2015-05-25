var plivo = require('plivo-node');
var Plivo;
var request = require('request');
Plivo = function(authId, authToken){
	this.name = "plivo";
	this.keys = {
		authId : authId,
		authToken : authToken
	};
	this.validate = function(callback) {
		request(this.getOptions(this.keys.authId, this.keys.authToken), function(err, result) {
		if (result.body === '{"code":"InvalidCredentials","message":"Application ID and/or Secret unauthorized."}') {
			return callback(err, null);
		}
		else return callback(null, result);
	});
	}
	this.getOptions = function(authId, authToken) {
		var options = {
			url: 'https://api.plivo.com/v1.Account/',
			method: 'GET',
			auth : {
      	'user': authId,
				'pass': authToken,
				'sendImmediately' : false
      }
		};
	return options;
	}
	return this;
  };

module.exports = Plivo;
