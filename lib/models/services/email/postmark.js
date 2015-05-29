var postmark = require("postmark");

var Postmark = function(keys) {
  this.name = "postmark";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validatePostmarkCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
    return this.client().getEmailClientUsage({}, function(err, result) {
      return callback(err, result);
    });
  };
  this.validatePostmarkCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		server_key: {
  			type: 'string',
  			required: true,
  			message: 'SERVER KEY IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return postmark(this.keys.server_key);
  };
  return this;
};
module.exports = Postmark;
