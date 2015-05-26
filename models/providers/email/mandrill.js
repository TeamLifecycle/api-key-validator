var Mandrill;
var mandrill = require('mandrill-api/mandrill');
Mandrill = function(apiKey) {
  this.name = "mandrill";
  this.keys = {
    apiKey: apiKey
  };
  this.validate = function(callback) {
    return this.client().messages.searchTimeSeries({}, (function(response) {
      return callback(null, response);
    }), function(e) {
      return callback(e);
    });
  };
  this.client = function() {
    return new mandrill.Mandrill(this.keys.apiKey);
  };
  return this;
};
module.exports = Mandrill;
