var Postmark, postmark;
var postmark = require("postmark");

Postmark = function(serverKey) {
  this.name = "postmark";
  this.keys = {
    serverKey: serverKey
  };
  this.validate = function(callback) {
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
