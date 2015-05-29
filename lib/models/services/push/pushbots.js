var PushBots = require('pushbots');
var request = require("request");

var Pushbots = function(keys) {
  this.name = "pushbots";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validatePushbotsCall(this.keys);
    if (this.keyErrors.length != 0) {
      return callback(this.keyErrors, null);
    }
    request(this.putOptions(this.keys), function(err, result) {
      if (result.statusCode == 401) return callback(result.body, null);
      else return callback(null, result);
    });
  }
  this.validatePushbotsCall = function(keys) {
    var schema = require('validate');
    var user = schema({
      app_id: {
        type: 'string',
        required: true,
        message: 'APP ID IS REQUIRED'
      },
    });
    return user.validate(keys)
  }
  this.putOptions = function(keys) {
    var options = {
      url: 'https://api.pushbots.com/stats',
      method: 'PUT',
      headers: {
        'X-PUSHBOTS-APPID': keys.app_id,
        'Content-Type': 'application/json'
      }
    };
    return options;
  }
  return this;
};
module.exports = Pushbots;
