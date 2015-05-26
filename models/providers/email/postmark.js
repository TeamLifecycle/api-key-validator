var Postmark, postmark;
var postmark = require("postmark");
var helper = require("../helpers")

Postmark = function(keys) {
  this.name = "postmark";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = helper.validatePostmarkCall(this.keys);
    if(this.keyErrors.length!=0){
      console.log(this.keyErrors.length, this.keyErrors);
      return callback(this.keyErrors, null);
    }
    return this.client().getEmailClientUsage({}, function(err, result) {
      return callback(err, result);
    });
  };
  this.client = function() {
    return postmark(this.keys.serverKey);
  };
  return this;
};
module.exports = Postmark;
