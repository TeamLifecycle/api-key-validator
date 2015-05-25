var Zeropush;
var zeroPush = require("nzero-push")
var request = require("request");
Zeropush = function(server_token) {
  this.name = "parse";
  this.keys = {
    server_token: server_token
  };
  this.validate = function(callback) {
    request(this.getOptions(this.keys), function(err, result) {
    if (result.statusCode === 401) return callback(result.body, null)
    else return callback(null, result)
      });
    }
  this.getOptions = function(keys) {
    var options = {
      url: 'https://api.zeropush.com/verify_credentials',
      method: 'GET',
      headers : {
        'auth_token': keys.server_token,
      }
    };
    return options;
  }
  return this;
}
module.exports = Zeropush;
