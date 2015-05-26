var Nexmo;
var helper = require("../helpers")

Nexmo = function(keys){
	this.name = "nexmo";
	this.keys = keys;
  	this.validate = function(callback){
			this.keyErrors = helper.validateNexmoCall(this.keys);
	    if(this.keyErrors.length!=0){
	      console.log(this.keyErrors);
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
