var helper = require("../helpers")
var request = require("request")
var Mailgun = function(keys) {
  this.name = "mailgun";
  this.keys = keys;
  this.validate = function(callback) {
    this.keyErrors = this.validateMailgunCall(this.keys);
    if (this.keyErrors.length != 0) {
      return callback(this.keyErrors, null);
    }
    request(this.getOptions(), function(err, result) {
      if (result.statusCode === 200) {
        return callback(null, result);
      } else {
        return callback(result, null);
      }
    });
  };
  this.validateMailgunCall = function(keys) {
    var schema = require('validate');
    var user = schema({
      api_user: {
        type: 'string',
        required: true,
        message: 'API USER IS REQUIRED'
      },
      domain: {
        type: 'string',
        required: true,
        match: /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/,
        message: 'DOMAIN IS IMPROPER FORMAT'
      },
    });
    return user.validate(keys)
  }
  this.getOptions = function() {
    url = 'https://api:'+ this.keys.api_user +'@api.mailgun.net/v3/'+ this.keys.domain +'/stats';
    console.log("url", url);
    var options = {
      url: url,
      method: 'GET'
    };
    return options;
  }
  return this;
};
module.exports = Mailgun;
