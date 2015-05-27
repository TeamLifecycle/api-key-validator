var Twilio = function(keys) {
  this.name = "twilio";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateTwilioCall(this.keys);
    if(this.keyErrors.length!=0){
      return callback(this.keyErrors, null);
    }
    return this.client().accounts(this.keys.account_sid).get(function(err, account) {
      return callback(err, account);
    });
  };
  this.validateTwilioCall = function(keys){
  	var schema = require('validate');
  	var user = schema({
  		account_sid: {
  			type: 'string',
  			required: true,
  			message: 'ACCOUNT SID KEY IS REQUIRED'
  		},
  		auth_token: {
  			type: 'string',
  			required: true,
  			message: 'AUTH TOKEN IS REQUIRED'
  		},
  	});
  	return user.validate(keys)
  }
  this.client = function() {
    return require('twilio')(this.keys.account_sid, this.keys.auth_token);
  };
  return this;
};

module.exports = Twilio;
