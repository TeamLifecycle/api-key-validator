var Parse;
var helper = require("../helpers")
Parse = function(keys) {
  this.name = "parse";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validateParseCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().getRoles(function(err, resp) {
      return callback(err, resp);
    });
  };
  this.client = function() {
    return new (require('node-parse-api').Parse)({
      app_id: this.keys.appId,
      api_key: this.keys.apiKey
    });
  };
  return this;
};
module.exports = Parse;
