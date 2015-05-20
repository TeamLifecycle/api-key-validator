var Parse;//, ServiceProvider;
//var ServiceProvider = require("../service_provider");
Parse = function(appId, apiKey) {
  this.name = "parse";
  this.keys = {
    appId: appId,
    apiKey: apiKey
  };
  this.validate = function(callback) {
    return this.client().getRoles(function(err, resp) {
      //console.log(err, resp);
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



// Parse.prototype = new ServiceProvider;

module.exports = Parse;


