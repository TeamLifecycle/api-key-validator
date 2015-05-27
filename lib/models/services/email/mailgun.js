var Mailgun;
var helper = require("../helpers")
Mailgun = function(keys) {
  this.name = "mailgun";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateMailgunCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
      return this.client().get("/" + this.keys.domain + "/stats", {
      event: ["sent"]
    }, function(error, mailgunStats) {
      if(helper.isEmptyObject(mailgunStats)){
        return callback(error, null);
      }
      else{
        return callback(error, mailgunStats);
      }
    });
  };
  this.validateMailgunCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		apiUser: {
  			type: 'string',
  			required: true,
  			message: 'API USER IS REQUIRED'
  		},
  		domain: {
  			type: 'string',
  			required: true,
  			match: /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/,
  			message: 'DOMAIN IS IMPROPER FORMAT'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return require('mailgun-js')({
      apiKey: this.keys.apiKey,
      domain: this.keys.domain
    });
  };
  return this;
};
module.exports = Mailgun;
