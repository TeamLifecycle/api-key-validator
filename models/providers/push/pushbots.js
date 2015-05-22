var Pushbots;//, ServiceProvider;
var PushBots = require('pushbots');
var request = require('request');
Pushbots = function(appId, secret) {
  this.name = "pushbots"
  this.keys = {
    appId : appId,
    secret : secret
  }
  this.validate = function(callback) {
    request(this.getOptions(this.keys.application_key, this.keys.application_secret), function(err, result) {
    if (err) {
      console.log("ERROR: ", err)
      return callback(err, null);
    } else {
      return callback(null, result);
    }
  });
}
  this.getOptions = function(key, secret) {
    var options = {
      url: 'https://onesignal.com/app/v1/apps/' + this.appId,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      'id': this.appId
        // 'sendImmediately': false
      };
    return options;
  }
  return this;
};



// Parse.prototype = new ServiceProvider;

module.exports = Pushbots;
