var Mandrill, ServiceProvider;
//var ServiceProvider = require("../service_provider");
var mandrill = require('mandrill-api/mandrill');

Mandrill = function(apiKey) {
  this.name = "mandrill";
  this.keys = {
    apiKey: apiKey
  };
  this.validate = function(callback) {
    return this.client().messages.searchTimeSeries({}, (function(result) {
      return callback(null, result);
    }), function(e) {
      return callback(e);
    });
  };
  this.client = function() {
    return new mandrill.Mandrill(this.keys.apiKey);
  };
  return this;
};



// Mandrill.prototype = new ServiceProvider;
module.exports = Mandrill;



