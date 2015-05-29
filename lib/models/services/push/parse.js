var Parse;
var helper = require("../helpers")
var request = require('request');
Parse = function(keys) {
  this.name = "parse";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateParseCall(this.keys);
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
  };
  this.validateParseCall = function(keys){
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
      url: 'https://api.parse.com/1/config',
      method: 'GET',
      headers: {
       'X-Parse-Application-Id': this.keys.app_id,
       'X-Parse-REST-API-Key': this.keys.api_key
      }
    };
    return options;
  }
  return this;
};
module.exports = Parse;
