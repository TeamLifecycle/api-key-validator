var ServiceProvider;

ServiceProvider = function(keys) {
  this.keys = keys;
  this.client = {};
};

ServiceProvider.prototype.initialize = function() {};

ServiceProvider.prototype.send = function() {};

module.exports = ServiceProvider;
