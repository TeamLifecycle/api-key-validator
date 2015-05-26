var Mailgun;
var helper = require("../helpers")
Mailgun = function(keys) {
  this.name = "mailgun";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validateMailgunCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors);
      return callback(this.keyErrors, null);
    }
      return this.client().get("/" + this.keys.domain + "/stats", {
      event: ["sent"]
    }, function(error, mailgunStats) {
      if(helper.isEmptyObject(mailgunStats)){
        return callback(error, null);
      }
      else{
        return callback(error, mailgunStats);
      }
    });
  };
  this.client = function() {
    return require('mailgun-js')({
      apiKey: this.keys.apiKey,
      domain: this.keys.domain
    });
  };
  return this;
};
module.exports = Mailgun;
