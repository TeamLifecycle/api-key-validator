var Sendgrid, ServiceProvider, sendgrid;
var sendgrid = require("sendgrid-extended");
//var ServiceProvider = require("../service_provider");
Sendgrid = function(apiUser, apiKey) {
  this.name = "sendgrid";
  this.keys = {
    apiUser: apiUser,
    apiKey: apiKey
  };
  this.validate = function(callback) {
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
// Sendgrid.prototype = new ServiceProvider;
// ​
module.exports = Sendgrid;


