var Sinch;
var request = require('request');

Sinch = function(keys) {
  	this.name = "sinch"
  	this.keys = keys
  this.validate = function(data, callback) {
    request(this.getOptions(data.to, this.keys.application_key, this.keys.application_secret, data.message), function(err, result) {
    if (err) {
      // sinchStat = new SinchServiceStatus(err, false);
      // debug("-_-_ FAILED with sinch _-_-");
      // debug(sinchStat);
      return callback(err, null);
    } else {
      // sinchStat = new SinchServiceStatus(result, true);
      // debug("-_-_ sent with sinch _-_-");
      // result.service = context;
      // result.status = sinchStat;
      return callback(null, result);
    }
});
}
  this.getOptions = function(to, key, secret, message) {
  var options = {
    url: 'https://messagingapi.sinch.com/v1/sms/+' + to,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    'auth': {
      'user': key,
      'pass': secret
      // 'sendImmediately': false
    },
    body: {
      message: message
    }
    };
  return options;
  }
  return this;
}
module.exports = Sinch
