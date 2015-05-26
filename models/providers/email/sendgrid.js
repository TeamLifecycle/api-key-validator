var Sendgrid, sendgrid;
var sendgrid = require("sendgrid-extended");
var helper = require("../helpers")
Sendgrid = function(keys) {
  this.name = "sendgrid";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validateSendgridCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().stats({}, function(err, data) {
        if(data && data["error"]){
          return callback(data["error"], null);
        }
        else{
          return callback(null, data);
        }
    });
  };
  this.client = function() {
    return sendgrid(this.keys.apiUser, this.keys.apiKey);
  };
  return this;
};
module.exports = Sendgrid;
