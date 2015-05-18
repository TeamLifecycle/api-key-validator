var AppIntegration, IntegrationType, Mailgun, Mandrill, ObjectId, Parse, Postmark, Sendgrid, Twilio, _, h, keysController, mongoose, v;
keysController = {};
v = require(process.env.PWD + "/config/vars");
h = require("" + v.PATH.v1.HELPERS);
mongoose = require("mongoose");
require(v.PATH.v1.MODELS + "/app_integration");
require(v.PATH.v1.MODELS + "/integration_type");
AppIntegration = mongoose.models.AppIntegration;
IntegrationType = mongoose.models.IntegrationType;
ObjectId = mongoose.Types.ObjectId;
_ = require("underscore");
Sendgrid = require(v.PATH.v1.PROVIDERS + "/email/sendgrid");
Mandrill = require(v.PATH.v1.PROVIDERS + "/email/mandrill");
Mailgun = require(v.PATH.v1.PROVIDERS + "/email/mailgun");
Postmark = require(v.PATH.v1.PROVIDERS + "/email/postmark");
Twilio = require(v.PATH.v1.PROVIDERS + "/sms/twilio");
Parse = require(v.PATH.v1.PROVIDERS + "/push/parse");
keysController.getKeysForApp = function(req, res) {
  var type;
  type = req.params.service;
  return IntegrationType.findOne({
    slug: type
  }, function(err, integrationType) {
    if (!integrationType) {
      return res.status(400).send({
        message: "invalid service type"
      });
    }
    return AppIntegration.find({
      app: new ObjectId(req.userapp._id),
      "integration.type._id": new ObjectId(integrationType._id),
      "active": true
    }, function(err, appIntegrations) {
      var keys;
      if (err) {
        console.error(err);
      }
      if (!appIntegrations.length) {
        return res.status(202).send({
          message: "no active services for type: " + type
        });
      }
      if (!appIntegrations.length) {
        return res.status(500).send({
          error: 'Something blew up!'
        });
      }
      keys = {};
      _.each(appIntegrations, function(appint) {
        if (appint.active) {
          return keys[appint.integration.slug] = appint.requiredFields;
        }
      });
      return res.status(200).send(h.keysToObj(keys));
    });
  });
};
keysController.validate.sendgrid = function(req, res) {
  var accountSid, apiKey, apiUser, appId, authToken, domain, mailgunClient, mandrillClient, parseClient, postmarkClient, sendgridClient, serverKey, twilioClient;
  apiUser = req.body["api_user"];
  apiKey = req.body["api_key"];
  if (!(apiUser && apiKey)) {
    return res.sendStatus(403);
  }
  sendgridClient = new Sendgrid(apiUser, apiKey);
  return sendgridClient.checkKeys(function(err, data) {
    if (err) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  });
  }
keysController.validate.mandrill = function(req, res) {
  apiKey = req.body["api_key"];
  mandrillClient = new Mandrill(apiKey);
  if (!apiKey) {
    return res.sendStatus(403);
  }
  return mandrillClient.checkKeys(function(err, data) {
    if (err) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  });
}
keysController.validate.postmark = function(req, res) {
  serverKey = req.body["server_key"];
  postmarkClient = new Postmark(serverKey);
  if (!serverKey) {
    return res.sendStatus(403);
  }
  return postmarkClient.checkKeys(function(err, data) {
    if (err) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  });
}
keysController.validate.mailgun = function(req, res) {
  apiKey = req.body["api_key"];
  domain = req.body["domain"];
  if (!(apiKey && domain)) {
    return res.sendStatus(403);
  }
  mailgunClient = new Mailgun(apiKey, domain);
  return mailgunClient.checkKeys(function(err, data) {
    if (err) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  });
}
keysController.validate.twilio = function(req, res) {
    accountSid = req.body["account_sid"];
    authToken = req.body["auth_token"];
    if (!(accountSid && authToken)) {
      return res.sendStatus(403);
    }
    twilioClient = new Twilio(accountSid, authToken);
    return twilioClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });
  }
keysController.validate.parse = function(req, res) {
    appId = req.body["app_id"];
    apiKey = req.body["api_key"];
    if (!(apiKey && appId)) {
      return res.sendStatus(403);
    }
    parseClient = new Parse(appId, apiKey);
    return parseClient.checkKeys(function(err, data) {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });
  }
module.exports = keysController;
