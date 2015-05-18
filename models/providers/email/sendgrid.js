var Sendgrid, ServiceProvider, sendgrid;
​
sendgrid = require("sendgrid-extended");
​
Sendgrid = function(apiUser, apiKey) {
  this.name = "sendgrid";
  this.keys = {
    apiUser: apiUser,
    apiKey: apiKey
  };
  this.checkKeys = function(callback) {
    return this.client().stats({}, function(err, data) {
      return callback(data["error"], null);
    });
  };
  this.client = function() {
    return sendgrid(this.keys.apiUser, this.keys.apiKey);
  };
  
  this.validate = function(req, res) {
  var accountSid, apiKey, apiUser, appId, authToken, domain, mailgunClient, mandrillClient, parseClient, postmarkClient, sendgridClient, serverKey, twilioClient;
    apiUser = req.body["api_user"];
    apiKey = req.body["api_key"];
    if (!(apiUser && apiKey)) {
      return res.sendStatus(403);
    }
    sendgridClient = new Sendgrid(apiUser, apiKey);
    return sendgridClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
  });
  }
  return this;
};
​
ServiceProvider = require("../service_provider");
​
Sendgrid.prototype = new ServiceProvider;
​
module.exports = Sendgrid;


