var helper = require("../helpers")
var Mandrill;
var mandrill = require('mandrill-api/mandrill');
Mandrill = function(keys) {
  this.name = "mandrill";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateMandrillCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
    return this.client().messages.searchTimeSeries({}, (function(response) {
      return callback(null, response);
    }), function(e) {
      return callback(e);
    });
  };
  this.validateMandrillCall = function(keys) {
  	var schema = require('validate');
  	var user = schema({
  		api_key: {
  			type: 'string',
  			required: true,
  			message: 'API KEY IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return new mandrill.Mandrill(this.keys.api_key);
  };
  return this;
};
module.exports = Mandrill;
