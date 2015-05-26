var Twilio;
var helper = require("../helpers")

Twilio = function(keys) {
  this.name = "twilio";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validateTwilioCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().accounts(this.keys.accountSid).get(function(err, account) {
      return callback(err, account);
    });
  };
  this.client = function() {
    return require('twilio')(this.keys.accountSid, this.keys.authToken);
  };
  return this;
};

module.exports = Twilio;
