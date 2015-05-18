var Parse, ServiceProvider;

Parse = function(appId, apiKey) {
  this.name = "parse";
  this.keys = {
    appId: appId,
    apiKey: apiKey
  };
  this.checkKeys = function(callback) {
    return this.client().getRoles(function(err, resp) {
      return callback(err, resp);
    });
  };
  this.client = function() {
    return new (require('node-parse-api').Parse)({
      app_id: this.keys.appId,
      api_key: this.keys.apiKey
    });
  };
  return this;
};

ServiceProvider = require("../service_provider");

Parse.prototype = new ServiceProvider;

module.exports = Parse;


