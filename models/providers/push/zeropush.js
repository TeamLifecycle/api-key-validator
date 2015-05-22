var Zeropush;
var zeroPush = require("nzero-push")

Zeropush = function(server_token) {
  this.name = "parse";
  this.keys = {
    server_token: server_token
  };
  this.validate = function(callback) {
    return this.client().inactiveTokens(function(err, response) {
        return callback(err, result)
      });
    }
  this.client = function() {
    return new zeroPush(this.keys.server_token)
    };
  return this;
}



// Zeropush.prototype = new ServiceProvider;

module.exports = Zeropush;
