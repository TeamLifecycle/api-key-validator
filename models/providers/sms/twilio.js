var ServiceProvider, Twilio;

Twilio = function(accountSid, authToken) {
  this.name = "twilio";
  this.keys = {
    accountSid: accountSid,
    authToken: authToken
  };
  this.checkKeys = function(callback) {
    return this.client().accounts(this.keys.accountSid).get(function(err, account) {
      return callback(err, account);
    });
  };
  this.client = function() {
    return require('twilio')(this.keys.accountSid, this.keys.authToken);
  };
  this.validate = function(req, res) {
    accountSid = req.body["account_sid"];
    authToken = req.body["auth_token"];
    if (!(accountSid && authToken)) {
      return res.sendStatus(403);
    }
    twilioClient = new Twilio(accountSid, authToken);
    return twilioClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });
  }
  return this;
};

ServiceProvider = require("../service_provider");

Twilio.prototype = new ServiceProvider;

module.exports = Twilio;



