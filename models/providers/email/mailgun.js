var Mailgun, ServiceProvider;

Mailgun = function(apiKey, domain) {
  this.name = "mailgun";
  this.keys = {
    apiKey: apiKey,
    domain: domain
  };
  this.checkKeys = function(callback) {
    return this.client().get("/" + this.keys.domain + "/stats", {
      event: ["sent"]
    }, function(error, mailgunStats) {
      return callback(error, null);
    });
  };
  this.client = function() {
    return require('mailgun-js')({
      apiKey: this.keys.apiKey,
      domain: this.keys.domain
    });
  };
  return this;
};

ServiceProvider = require("../service_provider");

Mailgun.prototype = new ServiceProvider;

module.exports = Mailgun;



this.mailgun = function(req, res) {
  apiKey = req.body["api_key"];
  domain = req.body["domain"];
  if (!(apiKey && domain)) {
    return res.sendStatus(403);
  }
  mailgunClient = new Mailgun(apiKey, domain);
  return mailgunClient.checkKeys(function(err, data) {
    if (err) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  });
}
