var Postmark, ServiceProvider, postmark;
//var ServiceProvider = require("../service_provider");
var postmark = require("postmark");

Postmark = function(serverKey) {
  this.name = "postmark";
  this.keys = {
    serverKey: serverKey
  };
  this.validate = function(callback) {
    //console.log("checkkeys", this.client());
    return this.client().getEmailClientUsage({}, function(err, result) {
      return callback(err, result);
    });
  };
  this.client = function() {
    return postmark(this.keys.serverKey);
  };
  return this;
};



// Postmark.prototype = new ServiceProvider;

module.exports = Postmark;




