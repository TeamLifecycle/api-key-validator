var helper = require("../helpers")
var Mandrill;
var mandrill = require('mandrill-api/mandrill');
Mandrill = function(keys) {
  this.name = "mandrill";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validatePostmarkCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors.length, this.keyErrors);
      return callback(this.keyErrors, null);
    }
    this.keyErrors = helper.validateMandrillCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().messages.searchTimeSeries({}, (function(response) {
      return callback(null, response);
    }), function(e) {
      return callback(e);
    });
  };
  this.client = function() {
    return new mandrill.Mandrill(this.keys.apiKey);
  };
  return this;
};
module.exports = Mandrill;
