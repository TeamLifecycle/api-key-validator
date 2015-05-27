var Sendgrid, sendgrid;
var sendgrid = require("sendgrid-extended");
var helper = require("../helpers")
Sendgrid = function(keys) {
  this.name = "sendgrid";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateSendgridCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().stats({}, function(err, data) {
        if(data && data["error"]){
          return callback(data["error"], null);
        }
        else{
          return callback(null, data);
        }
    });
  };
  this.validateSendgridCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		api_user: {
  			type: 'string',
  			required: true,
  			message: 'API USER IS REQUIRED'
  		},
  		api_key: {
  			type: 'string',
  			required: true,
  			message: 'API KEY IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return sendgrid(this.keys.api_user, this.keys.api_key);
  };
  return this;
};
module.exports = Sendgrid;
