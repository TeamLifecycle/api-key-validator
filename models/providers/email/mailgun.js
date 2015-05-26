var Mailgun;
var helper = require("../helpers")
Mailgun = function(apiKey, domain) {
  this.name = "mailgun";
  this.keys = {
    apiKey: apiKey,
    domain: domain
  };
  this.validate = function(callback) {
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
