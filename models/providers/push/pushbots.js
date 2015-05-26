var Pushbots;
var PushBots = require('pushbots');
var request = require("request");
var helper = require("../helpers")
Pushbots = function(keys) {
  this.name = "pushbots";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validatePushbotsCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
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
