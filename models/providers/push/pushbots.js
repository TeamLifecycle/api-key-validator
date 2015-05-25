var Pushbots;//, ServiceProvider;
var PushBots = require('pushbots');
var request = require("request");
Pushbots = function(appId, secret) {
  this.name = "pushbots"
  this.keys = {
    appId : appId,
    secret : secret
  }
  this.validate = function(callback) {
    request(this.putOptions(this.keys), function(err, result) {
    if(result.statusCode==401) return callback(result.body, null);
    else return callback(null, result);
    });
  }
  this.putOptions = function(keys) {
    var options = {
      url: 'https://api.pushbots.com/stats',
      method: 'PUT',
      headers : {
        'X-PUSHBOTS-APPID': keys.appId,
        'X-PUSHBOTS-SECRET': keys.secret,
        'Content-Type' : 'application/json'
      }
    };
    return options;
  }
  return this;
};
module.exports = Pushbots;
