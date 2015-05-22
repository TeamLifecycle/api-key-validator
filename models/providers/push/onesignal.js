var Onesignal;
var request = require('request');
Onesignal = function(app_id, api_key) {
  this.name = "onesignal"
	this.appId = app_id;

  this.validate = function(callback) {
    request(this.getOptions(this.appId), function(err, result) {
    console.log(err, result)
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, result);
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
