var Postmark, ServiceProvider, postmark;

postmark = require("postmark");

Postmark = function(serverKey) {
  this.name = "postmark";
  this.keys = {
    serverKey: serverKey
  };
  this.checkKeys = function(callback) {
    console.log("checkkeys", this.client());
    return this.client().getEmailClientUsage({}, function(err, result) {
      console.log(err, "---", result);
      return callback(err, result);
    });
  };
  this.client = function() {
    return postmark(this.keys.serverKey);
  };
  return this;
};

ServiceProvider = require("../service_provider");

Postmark.prototype = new ServiceProvider;

module.exports = Postmark;




