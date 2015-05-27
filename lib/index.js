/*
The MIT License (MIT)

Copyright (c) 2011 Prabhu Velayutham

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
var Mailgun = require('lib/models/services/email/mailgun')
var Mandrill = require('lib/models/services/email/mandrill')
var Postmark = require('lib/models/services/email/postmark')
var Sendgrid = require('lib/models/services/email/sendgrid')
var Onesignal = require('lib/models/services/push/onesignal')
var Parse = require('lib/models/services/push/parse')
var Pushbots = require('lib/models/services/push/pushbots')
var Zeropush = require('lib/models/services/push/zeropush')
var Nexmo = require('lib/models/services/sms/nexmo')
var Plive = require('lib/models/services/sms/plivo')
var Sinch = require('lib/models/services/sms/sinch')
var Twilio = require('lib/models/services/sms/twilio')

apiKeyValidator = function(service, keys) {
  this.service = service;
  this.keys = keys;
  this.validate = function(callback){
    if (service == "mailgun") Mailgun.validate(keys);
    if (service == "mandrill") Mandrill.validate(keys);
    if (service == "postmark") Postmark.validate(keys);
    if (service == "sendgrid") Sendgrid.validate(keys);
    if (service == "onesignal") Onesignal.validate(keys);
    if (service == "parse") Parse.validate(keys);
    if (service == "pushbots") Pushbots.validate(keys);
    if (service == "zeropush") Zeropush.validate(keys);
    if (service == "nexmo") Nexmo.validate(keys);
    if (service == "plivo") Plivo.validate(keys);
    if (service == "sinch") Sinch.validate(keys);
    if (service == "twilio") Twilio.validate(keys);
  }
}
module.exports = apiKeyValidator;
