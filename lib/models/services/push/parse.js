var Parse;
var helper = require("../helpers")
Parse = function(keys) {
  this.name = "parse";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateParseCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().getRoles(function(err, resp) {
      return callback(err, resp);
    });
  };
  this.validateParseCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		appID: {
  			type: 'string',
  			required: true,
  			message: 'APP ID IS REQUIRED'
  		},
  		apiKey: {
  			type: 'string',
  			required: true,
  			message: 'API KEY IS REQUIRED'
  		},
  	});

  	return user.validate(keys)
  }
  this.client = function() {
    return new (require('node-parse-api').Parse)({
      app_id: this.keys.appId,
      api_key: this.keys.apiKey
    });
  };
  return this;
};
module.exports = Parse;
