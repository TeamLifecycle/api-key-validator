var Zeropush;
var zeroPush = require("nzero-push")
var request = require("request");
var helper = require("../helpers")
Zeropush = function(keys) {
  this.name = "parse";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateZeropushCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
    request(this.getOptions(this.keys), function(err, result) {
    if (result.statusCode === 401) {
      return callback(result.body, null)
    }
    else return callback(null, result)
      });
    }
  this.validateZeropushCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		server_token: {
  			type: 'string',
  			required: true,
  			message: 'SERVER TOKEN IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.getOptions = function(keys) {
    var options = {
      url: 'https://api.zeropush.com/verify_credentials?auth_token='+keys.server_token,
      method: 'GET',
    };
    return options;
  }
  return this;
}
module.exports = Zeropush;
