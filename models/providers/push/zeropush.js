var Zeropush;
var zeroPush = require("nzero-push")
var request = require("request");
var helper = require("../helpers")
Zeropush = function(keys) {
  this.name = "parse";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validateZeropushCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
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
