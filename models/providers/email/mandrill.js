var Mandrill, ServiceProvider, mandrill;

mandrill = require('mandrill-api/mandrill');

Mandrill = function(apiKey) {
  this.name = "mandrill";
  this.keys = {
    apiKey: apiKey
  };
  this.checkKeys = function(callback) {
    return this.client().messages.searchTimeSeries({}, (function(result) {
      return callback(null, null);
    }), function(e) {
      return callback(e);
    });
  };
  this.client = function() {
    return new mandrill.Mandrill(this.keys.apiKey);
  };
  this.validate = function(req, res) {
    apiKey = req.body["api_key"];
    mandrillClient = new Mandrill(apiKey);
    if (!apiKey) {
      return res.sendStatus(403);
    }
    return mandrillClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });
  }
  return this;
};

ServiceProvider = require("../service_provider");

Mandrill.prototype = new ServiceProvider;

module.exports = Mandrill;



