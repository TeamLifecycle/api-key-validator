var Mailgun = require('./models/services/email/mailgun')
var Mandrill = require('./models/services/email/mandrill')
var Postmark = require('./models/services/email/postmark')
var Sendgrid = require('./models/services/email/sendgrid')

var Onesignal = require('./models/services/push/onesignal')
var Parse = require('./models/services/push/parse')
var Pushbots = require('./models/services/push/pushbots')
var Zeropush = require('./models/services/push/zeropush')

var Nexmo = require('./models/services/sms/nexmo')
var Plivo = require('./models/services/sms/plivo')
var Sinch = require('./models/services/sms/sinch')
var Twilio = require('./models/services/sms/twilio')

apiKeyValidator = function() {
  this.validate = function(service, keys, callback){
    if (service == "roost") return callback(null, true) 
    if (service == "mailgun") new Mailgun(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "mandrill") new Mandrill(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "postmark") new Postmark(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "sendgrid") new Sendgrid(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "onesignal") new Onesignal(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "parse") new Parse(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "pushbots") new Pushbots(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "zeropush") new Zeropush(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "nexmo") new Nexmo(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "plivo") new Plivo(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "sinch") new Sinch(keys).validate( function(err, result){ return callback(err, result); });
    if (service == "twilio") new Twilio(keys).validate( function(err, result){ return callback(err, result); });
  }
}

module.exports = new apiKeyValidator();
