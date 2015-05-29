var nexmo = require('easynexmo')

var Nexmo = function(keys){
	this.name = "nexmo";
	this.keys = keys;
	this.validate = function(callback){
		this.keyErrors = this.validateNexmoCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
		return this.client().checkBalance(function(error, response){
			if ("error-code" in response){
				return callback(response, null)
			}
			else{
				return callback(null, response);
			}
 		})
	}
	this.validateNexmoCall = function(keys){
		var schema = require('validate');
		var user = schema({
			api_key: {
				type: 'string',
				required: true,
				message: 'API KEY IS REQUIRED'
			},
			api_secret: {
				type: 'string',
				required: true,
				message: 'API SECRET IS REQUIRED'
			},
		});
		return user.validate(keys)
	}
	this.client = function() {
    	var API_PROTOCOL = "https"
    	var DEBUG = false
    	nexmo.initialize(this.keys.api_key, this.keys.api_secret, API_PROTOCOL, DEBUG)
    	return nexmo
  	};
  	return this;
};

module.exports = Nexmo;
