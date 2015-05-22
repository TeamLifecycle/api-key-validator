// var EmailServiceProvider, MessageBus, messagebus;

// messagebus = require("messagebus");

// MessageBus = function(apiKey) {
//   this.name = "messagebus";
//   this.keys = {
//     apiKey: apiKey
//   };
//   this.checkKeys = function(callback) {
//     return this.client().stats({}, function(err, data) {
//       return callback(data["error"], null);
//     });
//   };
//   return callback(null);
//   this.client = function() {
//     return messagebus(this.keys.apiUser, this.keys.apiKey);
//   };
//   return this;
// };

// //EmailServiceProvider = require("./email_service_provider");

// MessageBus.prototype = new EmailServiceProvider;

// module.exports = MessageBus;
