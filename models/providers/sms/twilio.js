var Twilio;
Twilio = function(accountSid, authToken) {
  this.name = "twilio";
  this.keys = {
    accountSid: accountSid,
    authToken: authToken
  };
  this.validate = function(callback) {
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
