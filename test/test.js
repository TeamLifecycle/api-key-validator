"use strict";
var nock = require("nock");
var should = require("chai").should();
var Mailgun = require("../models/providers/email/mailgun");
var Mandrill = require("../models/providers/email/mandrill");
var Postmark = require("../models/providers/email/postmark");
var Sendgrid = require("../models/providers/email/sendgrid");
var Parse = require("../models/providers/push/parse");
var Zeropush = require("../models/providers/push/zeropush");
var Onesignal = require("../models/providers/push/onesignal");
var Pushbots = require("../models/providers/push/pushbots");
var Nexmo = require("../models/providers/sms/nexmo");
var Twilio = require("../models/providers/sms/twilio");
var Plivo = require("../models/providers/sms/plivo");
var Sinch = require("../models/providers/sms/sinch");



describe('when email providers are online', function(){
	it('sendgrid result should be populated and err should be null', function(done){
		// have service name and api keys
		// initialize provider client with key
		// validate keys by calling a function
		// return callback of (err, result)
		//var service = "sendgrid"
		var keys = {
			apiUser : "ldksafjsd",
			apiKey : "ldksafjsd"
		}
		//console.log(Sendgrid)
		var sendgridClient = new Sendgrid(keys)
		nock('https://api.sendgrid.com:443/api')
			.post('/stats.get.json')
			.reply(200, {"message": "success"});
		sendgridClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('mailgun result should be populated and err should be null', function(done){
		var keys = {
			apiUser : "ldksafjsd",
			domain : "ldksaf.jsd"
		}
		nock('https://api.mailgun.net')
			.get('/v2/ldksaf.jsd/stats?event=sent')
			.reply(200, {"message": "success"});
		var mailgunClient = new Mailgun(keys)
		mailgunClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('postmark result should be populated and err should be null', function(done){
		var keys = {
			serverKey : "ldksafjsd"
		}
		nock('https://api.postmarkapp.com:443')
			.get('/stats/outbound/opens/emailclients?')
		 	.reply(200, {"message": "success"});
		var postmarkClient = new Postmark(keys)
		postmarkClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('mandrill result should be populated and err should be null', function(done){
		var keys = {apiKey : "ldksafjsd"}
		nock('https://mandrillapp.com/api/1.0')
			.post('/messages/search-time-series.json')
			.reply(200, {"status": "sent"});
		var mandrillClient = new Mandrill(keys)
		mandrillClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('parse result should be populated and err should be null', function(done){
		var keys = {
			appID : "ldksafjsd",
			apiKey : "djbwhsdk"
		}
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(200, [ "parse"]);
		var parseClient = new Parse(keys)
		parseClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('twilios result should be populated and err should be null', function(done){
		var keys = {
			accountSid : "ldksafjsd",
			authToken : "ldksafjsd"
		}
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd.json')
			.reply(200, {"status": "sent"});
		var twilioClient = new Twilio(keys)
		twilioClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('nexmo result should be populated and err should be null', function(done){
		var keys = {
			api_key : "ldksafjsd",
			api_secret : "ldksafjsd"
		}
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(200, {"status": "sent"});
		var nexmoClient = new Nexmo(keys)
		nexmoClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('plivo result should be populated and err should be null', function(done){
		var keys = {
			authId : "ldksafjsd",
			authToken : "ldksafjsd"
		}
		nock('https://api.plivo.com')
			.get('/v1.Account/')
			.reply(200, {"status": "sent"});
		var plivoClient = new Plivo(keys)
		plivoClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('sinch result should be populated and err should be null', function(done){
		var keys = {
		application_key : "ldksafjsd",
		application_secret : "ldksafjsd"
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(200, {"status": "sent"});
		var sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('zeropush result should be populated and err should be null', function(done){
		var keys = {
		server_token : "ldksafjsd",
		}
		nock('https://api.zeropush.com')
			.get('/verify_credentials')
			.reply(200, {"status": "sent"});
		var zeropushClient = new Zeropush(keys)
		zeropushClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('onesignal result should be populated and err should be null', function(done){
		var keys = {app_id : "ldksafjsd"}
		nock('https://onesignal.com:443/api')
			.get('/v1/apps')
			.reply(200, {"status": "sent"});
		var onesignalClient = new Onesignal(keys)
		onesignalClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('pushbots result should be populated and err should be null', function(done){
		var keys = {
			appId : "sfjvnss",
			secret : "ldksafjsd"
		}
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(200, {"status": "success"});
		var pushbotsClient = new Pushbots(keys)
		pushbotsClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});



	it('sendgrid should not return result object when key is incorrect', function(done){
		var keys = {
			apiUser : "ldksafjsd",
			apiKey : "ldksafjsd"
		}
		var sendgridClient = new Sendgrid(keys)
		nock('https://api.sendgrid.com:443/api')
			.post('/stats.get.json')
			.reply(403, {"error": "Bad username / password"});
		sendgridClient.validate(function(error, result){
			should.exist(error)
			should.not.exist(result);
			done()
		})
	});
	it('mailgun should not return result object when key is incorrect', function(done){
		var keys = {
			apiUser : "ldksafjsd",
			domain : "ldksaf.jsd"
		}
		nock('https://api.mailgun.net')
			.get('/v2/ldksaf.jsd/stats?event=sent')
			.reply(401,{});
		var mailgunClient = new Mailgun(keys)
		mailgunClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('postmark should not return result object when key is incorrect', function(done){
		var keys = {
			serverKey : "ldksafjsd"
		}
		nock('https://api.postmarkapp.com:443')
			.get('/stats/outbound/opens/emailclients?')
		 	.reply(401, {"ErrorCode":10,"Message":"Bad or missing Server API token."});
		var postmarkClient = new Postmark(keys)
		postmarkClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('mandrill should not return result object when key is incorrect', function(done){
		var keys = {apiKey : "ldksafjsd"}
		nock('https://mandrillapp.com/api/1.0')
			.post('/messages/search-time-series.json')
			.reply(500, {"status":"error","code":-1,"name":"Invalid_Key","message":"Invalid API key"});
		var mandrillClient = new Mandrill(keys)
		mandrillClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('parse should not return result object when key is incorrect', function(done){
		var keys = {
			appID : "ldksafjsd",
			apiKey : "djbwhsdk"
		}
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(401, {"error": "bad key"});
		var parseClient = new Parse(keys)
		parseClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('twilio should not return result object when key is incorrect', function(done){
		var keys = {
			accountSid : "ldksafjsd",
			authToken : "ldksafjsd"
		}
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd')
			.reply(400, {"error": "bad key"});
		var twilioClient = new Twilio(keys)
		twilioClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('nexmo should not return result object when key is incorrect', function(done){
		var keys = {
			api_key : "ldksafjsd",
			api_secret : "ldksafjsd"
		}
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(401, {"error-code":"401","error-code-label":"authentication failed"});
		var nexmoClient = new Nexmo(keys)
		nexmoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('plivo should not return result object when key is incorrect', function(done){
		var keys = {
			authId : "ldksafjsd",
			authToken : "ldksafjsd"
		}
		nock('https://api.plivo.com')
			.get('/v1.Account/')
			.reply(500, {"error-code":"401","error-code-label":"authentication failed"});
		var plivoClient = new Plivo(keys)
		plivoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('onesignal should not return result object when key is incorrect', function(done){
	var keys = {app_id : "ldksafjsd"}
	nock('https://onesignal.com:443/api')
		.get('/v1/apps')
		.reply(400, {"errors":["Invalid or missing authentication token"]});
	var onesignalClient = new Onesignal(keys)
	onesignalClient.validate(function(error, result){
		should.not.exist(result);
		should.exist(error);
		done()
	})
	});
	it('sinch should not return result object when key is incorrect', function(done){
		var keys = {
		application_key : "ldksafjsd",
		application_secret : "ldksafjsd"
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(401, {"errorCode":40100,"message":"Authorization required"});
		var sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('zeropush result should be populated and err should be null', function(done){
		var keys = {
		server_token : "ldksafjsd",
		}
		nock('https://api.zeropush.com')
			.get('/verify_credentials')
			.reply(401, {"error":"authorization error","message":"Please provide a valid authentication token parameter or HTTP Authorization header.","reference_url":"https://zeropush.com/documentation/api_reference"});
		var zeropushClient = new Zeropush(keys)
		zeropushClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('pushbots result should be populated and err should be null', function(done){
		var keys = {
			appId : "sfjvnss",
			secret : "ldksafjsd"
		}
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(401, {"code":"InvalidCredentials","message":"Application ID and/or Secret unauthorized."});
		var pushbotsClient = new Pushbots(keys)
		pushbotsClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});



	it('sendgrid should return an error if the a parameter is missing', function(done){
		var keys = {
			apiUser : "skhvkab",
			apiKey : ""
		}
		var sendgridClient = new Sendgrid(keys)
		nock('https://api.sendgrid.com:443/api')
			.post('/stats.get.json')
			.reply(500, {"error": "Bad username / password"});
		sendgridClient.validate(function(error, result){
			should.exist(error)
			should.not.exist(result);
			done()
		})
	});
	it('sendgrid should return an error if the a parameter is missing', function(done){
		var keys = {
			apiUser : "",
			apiKey : "sfknvkj"
		}
		var sendgridClient = new Sendgrid(keys)
		nock('https://api.sendgrid.com:443/api')
			.post('/stats.get.json')
			.reply(500, {"error": "Bad username / password"});
		sendgridClient.validate(function(error, result){
			should.exist(error)
			should.not.exist(result);
			done()
		})
	});
	it('mailgun should return an error if the a parameter is missing', function(done){
		var keys = {
			apiUser : "",
			domain : "ldksa.fjsd"
		}
		nock('https://api.mailgun.net:443/v2')
			.get('/ldksafjsd/stats?event=sent')
			.reply(500,{});
		var mailgunClient = new Mailgun(keys)
		mailgunClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('mailgun should return an error if the a parameter is missing', function(done){
		var keys = {
			apiUser : "ldksafjsd",
			domain : ""
		}
		nock('https://api.mailgun.net:443/v2')
			.get('/ldksafjsd/stats?event=sent')
			.reply(500,{});
		var mailgunClient = new Mailgun(keys)
		mailgunClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('mailgun should return an error if the domain is malformed', function(done){
		var keys = {
			apiUser : "sfvjflsv",
			domain : "ldksafjsd"
		}
		nock('https://api.mailgun.net:443/v2')
			.get('/ldksafjsd/stats?event=sent')
			.reply(500,{});
		var mailgunClient = new Mailgun(keys)
		mailgunClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('postmark should return an error if the a parameter is missing', function(done){
		var keys = {
			serverKey : ""
		}
		nock('https://api.postmarkapp.com:443')
			.get('/stats/outbound/opens/emailclients?')
		 	.reply(500, {"ErrorCode":10,"Message":"Bad or missing Server API token."});
		var postmarkClient = new Postmark(keys)
		postmarkClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('postmark should return an error if the a parameter is missing', function(done){
		var keys = {apiKey : ""}
		nock('https://mandrillapp.com/api/1.0')
			.post('/messages/search-time-series.json')
			.reply(500, {"status":"error","code":-1,"name":"Invalid_Key","message":"Invalid API key"});
		var mandrillClient = new Mandrill(keys)
		mandrillClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('parse should return an error if the a parameter is missing', function(done){
		var keys = {
			appID : "",
			apiKey : "djbwhsdk"
		}
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(401, {"error": "bad key"});
		var parseClient = new Parse(keys)
		parseClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('parse should return an error if the a parameter is missing', function(done){
		var keys = {
			appID : "ldksafjsd",
			apiKey : ""
		}
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(401, {"error": "bad key"});
		var parseClient = new Parse(keys)
		parseClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('twilio should not return result object when key is incorrect', function(done){
		var keys = {
			accountSid : "",
			authToken : "ldksafjsd"
		}
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd')
			.reply(400, {"error": "bad key"});
		var twilioClient = new Twilio(keys)
		twilioClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('twilio should not return result object when key is incorrect', function(done){
		var keys = {
			accountSid : "ldksafjsd",
			authToken : ""
		}
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd')
			.reply(400, {"error": "bad key"});
		var twilioClient = new Twilio(keys)
		twilioClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('nexmo should return an error if the a parameter is missing', function(done){
		var keys = {
			api_key : "",
			api_secret : "ldksafjsd"
		}
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(401, {"error-code":"401","error-code-label":"authentication failed"});
		var nexmoClient = new Nexmo(keys)
		nexmoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('nexmo should return an error if the a parameter is missing', function(done){
		var keys = {
			api_key : "ldksafjsd",
			api_secret : ""
		}
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(401, {"error-code":"401","error-code-label":"authentication failed"});
		var nexmoClient = new Nexmo(keys)
		nexmoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('plivo should not return result object when key is incorrect', function(done){
		var keys = {
			authId : "",
			authToken : "ldksafjsd"
		}
		nock('https://api.plivo.com')
			.get('/v1.Account/')
			.reply(500, {"error-code":"401","error-code-label":"authentication failed"});
		var plivoClient = new Plivo(keys)
		plivoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('plivo should not return result object when key is incorrect', function(done){
		var keys = {
			authId : "ldksafjsd",
			authToken : ""
		}
		nock('https://api.plivo.com')
			.get('/v1.Account/')
			.reply(500, {"error-code":"401","error-code-label":"authentication failed"});
		var plivoClient = new Plivo(keys)
		plivoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('onesignal should return an error if the a parameter is missing', function(done){
	var keys = {app_id : "ldksafjsd"}
	nock('https://onesignal.com:443/api')
		.get('/v1/apps')
		.reply(400, {"errors":["Invalid or missing authentication token"]});
	var onesignalClient = new Onesignal(keys)
	onesignalClient.validate(function(error, result){
		should.not.exist(result);
		should.exist(error);
		done()
	})
	});
	it('sinch should return an error if the a parameter is missing', function(done){
		var keys = {
		application_key : "",
		application_secret : "ldksafjsd"
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(401, {"errorCode":40100,"message":"Authorization required"});
		var sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('sinch should return an error if the a parameter is missing', function(done){
		var keys = {
		application_key : "ldksafjsd",
		application_secret : ""
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(401, {"errorCode":40100,"message":"Authorization required"});
		var sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('zeropush result should be populated and err should be null', function(done){
		var keys = {
		server_token : "",
		}
		nock('https://api.zeropush.com')
			.get('/verify_credentials')
			.reply(401, {"error":"authorization error","message":"Please provide a valid authentication token parameter or HTTP Authorization header.","reference_url":"https://zeropush.com/documentation/api_reference"});
		var zeropushClient = new Zeropush(keys)
		zeropushClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('pushbots result should be populated and err should be null', function(done){
		var keys = {
			appId : "",
			secret : "ldksafjsd"
		}
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(401, {"code":"InvalidCredentials","message":"Application ID and/or Secret unauthorized."});
		var pushbotsClient = new Pushbots(keys)
		pushbotsClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('pushbots result should be populated and err should be null', function(done){
		var keys = {
			appId : "sfjvnss",
			secret : ""
		}
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(401, {"code":"InvalidCredentials","message":"Application ID and/or Secret unauthorized."});
		var pushbotsClient = new Pushbots(keys)
		pushbotsClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
});
