var Nexmo;
Nexmo = function(api_key, api_secret){
	this.name = "nexmo";
	this.keys = {
    	api_key: api_key,
    	api_secret: api_secret
  	};
  	this.validate = function(callback){
  		return this.client().checkBalance(function(error, response){
  			//console.log(error, response)
  			return callback(error, response);
   		})
  	}

	this.client = function() {
    	var API_PROTOCOL = "https"
    	var DEBUG = false
    	nexmo = require('easynexmo')
    	nexmo.initialize(this.keys.api_key, this.keys.api_secret, API_PROTOCOL, DEBUG)
    	return nexmo
  	};
  	return this;
};

module.exports = Nexmo;