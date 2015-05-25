var Onesignal;
var request = require('request');
Onesignal = function(app_id, api_key) {
  this.name = "onesignal"
	this.appId = app_id;

  this.validate = function(callback) {
    request(this.getOptions(this.appId), function(err, result) {
    if (result.statusCode === 200) {
      return callback(null, result);
    } else {
      return callback(result.body, null);
    }
});
}
  this.getOptions = function(appId) {
    var options = {
      url: 'https://onesignal.com/api/v1/apps',
      method: 'GET',
      headers: {
       'Authorization': 'Basic ' + this.appId
      }
    };
  return options;
  }
  return this;
}
module.exports = Onesignal;
