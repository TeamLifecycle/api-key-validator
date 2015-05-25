var nock = require("nock")
var should = require("chai").should()
var Mailgun = require("../models/providers/email/mailgun")
var Mandrill = require("../models/providers/email/mandrill")
var Postmark = require("../models/providers/email/postmark")
var Sendgrid = require("../models/providers/email/sendgrid")
var Parse = require("../models/providers/push/parse")
var Zeropush = require("../models/providers/push/zeropush")
var Onesignal = require("../models/providers/push/onesignal")
var Pushbots = require("../models/providers/push/pushbots")
var Nexmo = require("../models/providers/sms/nexmo")
var Twilio = require("../models/providers/sms/twilio")
var Plivo = require("../models/providers/sms/plivo")
var Sinch = require("../models/providers/sms/sinch")



describe('when email providers are online', function(){
	it('sendgrid result should be populated and err should be null', function(done){
		// have service name and api keys
		// initialize provider client with key
		// validate keys by calling a function
		// return callback of (err, result)
		//var service = "sendgrid"
		var apiUser = "ldksafjsd"
		var apiKey = "ldksafjsd"
		//console.log(Sendgrid)
		sendgridClient = new Sendgrid(apiUser, apiKey)
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
		var apiUser = "ldksafjsd"
		var domain = "ldksafjsd"
		nock('https://api.mailgun.net:443/v2')
			.get('/ldksafjsd/stats?event=sent')
			.reply(200, {"message": "success"});
		mailgunClient = new Mailgun(apiUser, domain)
		mailgunClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('postmark result should be populated and err should be null', function(done){
		var serverKey = "ldksafjsd"
		nock('https://api.postmarkapp.com:443')
			.get('/stats/outbound/opens/emailclients?')
		 	.reply(200, {"message": "success"});
		postmarkClient = new Postmark(serverKey)
		postmarkClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('mandrill result should be populated and err should be null', function(done){
		var apiKey = "ldksafjsd"
		nock('https://mandrillapp.com/api/1.0')
			.post('/messages/search-time-series.json')
			.reply(200, {"status": "sent"});
		mandrillClient = new Mandrill(apiKey)
		mandrillClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('parse result should be populated and err should be null', function(done){
		var appID = "ldksafjsd"
		var apiKey = "djbwhsdk"
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(200, [ "parse"]);
		parseClient = new Parse(appID, apiKey)
		parseClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('twilios result should be populated and err should be null', function(done){
		var accountSid = "ldksafjsd"
		var authToken = "ldksafjsd"
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd.json')
			.reply(200, {"status": "sent"});
		twilioClient = new Twilio(accountSid, authToken)
		twilioClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
	it('nexmo result should be populated and err should be null', function(done){
		var api_key = "ldksafjsd"
		var api_secret = "ldksafjsd"
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(200, {"status": "sent"});
		nexmoClient = new Nexmo(api_key, api_secret)
		nexmoClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('plivo result should be populated and err should be null', function(done){
		var authId = "ldksafjsd"
		var authToken = "ldksafjsd"
		nock('https://api.plivo.com')
			.get('/v1.Account/')
			.reply(200, {"status": "sent"});
		plivoClient = new Plivo(authId, authToken)
		plivoClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('sinch result should be populated and err should be null', function(done){
		keys = {
		application_key : "ldksafjsd",
		application_secret : "ldksafjsd"
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(200, {"status": "sent"});
		sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('zeropush result should be populated and err should be null', function(done){
		keys = {
		server_token : "ldksafjsd",
		}
		nock('https://api.zeropush.com')
			.get('/verify_credentials')
			.reply(200, {"status": "sent"});
		zeropushClient = new Zeropush(keys.server_token)
		zeropushClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('onesignal result should be populated and err should be null', function(done){
		var appId = "ldksafjsd";
		nock('https://onesignal.com:443/api')
			.get('/v1/apps')
			.reply(200, {"status": "sent"});
		onesignalClient = new Onesignal(appId)
		onesignalClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});
		it('pushbots result should be populated and err should be null', function(done){
		var appId = "sfjvnss"
		var secret = "ldksafjsd"
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(200, {"status": "success"});
		pushbotsClient = new Pushbots(appId, secret)
		pushbotsClient.validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})
	});



	it('sendgrid should not return result object when key is incorrect', function(done){
		var apiUser = "skhvkab"
		var apiKey = "ldksafjsd"
		//console.log(Sendgrid)
		sendgridClient = new Sendgrid(apiUser, apiKey)
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
		var apiUser = "ldksafjsd"
		var domain = "ldksafjsd"
		nock('https://api.mailgun.net:443/v2')
			.get('/ldksafjsd/stats?event=sent')
			.reply(401,{});
		mailgunClient = new Mailgun(apiUser, domain)
		mailgunClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('postmark should not return result object when key is incorrect', function(done){
		var serverKey = "ldksafjsd"
		nock('https://api.postmarkapp.com:443')
			.get('/stats/outbound/opens/emailclients?')
		 	.reply(401, {"ErrorCode":10,"Message":"Bad or missing Server API token."});
		postmarkClient = new Postmark(serverKey)
		postmarkClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('mandrill should not return result object when key is incorrect', function(done){
		var apiKey = "ldksafjsd"
		nock('https://mandrillapp.com/api/1.0')
			.post('/messages/search-time-series.json')
			.reply(500, {"status":"error","code":-1,"name":"Invalid_Key","message":"Invalid API key"});
		mandrillClient = new Mandrill(apiKey)
		mandrillClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('parse should not return result object when key is incorrect', function(done){
		var apiKey = "ldksafjsd"
		nock('https://api.parse.com:443')
			.get('/1/roles/')
			.reply(401, {"error": "bad key"});
		parseClient = new Parse(apiKey)
		parseClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('twilio should not return result object when key is incorrect', function(done){
		var accountSid = "ldksafjsd"
		var authToken = "dhkvbshk"
		nock('https://api.twilio.com')
			.get('/2010-04-01/Accounts/ldksafjsd')
			.reply(400, {"error": "bad key"});
		twilioClient = new Twilio(accountSid, authToken)
		twilioClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('nexmo should not return result object when key is incorrect', function(done){
		var api_key = "ldksafjsd"
		var api_secret = "ldksafjsd"
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(401, {"error-code":"401","error-code-label":"authentication failed"});
		nexmoClient = new Nexmo(api_key, api_secret)
		nexmoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
		it('plivo should not return result object when key is incorrect', function(done){
		var api_key = "ldksafjsd"
		var api_secret = "ldksafjsd"
		nock('https://rest.nexmo.com:443/account')
			.get('/get-balance?api_key=ldksafjsd&api_secret=ldksafjsd')
			.reply(500, {"error-code":"401","error-code-label":"authentication failed"});
		nexmoClient = new Nexmo(api_key, api_secret)
		nexmoClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('onesignal should not return result object when key is incorrect', function(done){
	var appId = "ldksafjsd";
	nock('https://onesignal.com:443/api')
		.get('/v1/apps')
		.reply(400, {"errors":["Invalid or missing authentication token"]});
	onesignalClient = new Onesignal(appId)
	onesignalClient.validate(function(error, result){
		should.not.exist(result);
		should.exist(error);
		done()
	})
	});
	it('sinch result should be populated and err should be null', function(done){
		keys = {
		application_key : "ldksafjsd",
		application_secret : "ldksafjsd"
		}
		nock('https://messagingapi.sinch.com')
			.post('/v1/sms/+')
			.reply(401, {"errorCode":40100,"message":"Authorization required"});
		sinchClient = new Sinch(keys)
		sinchClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('zeropush result should be populated and err should be null', function(done){
		keys = {
		server_token : "ldksafjsd",
		}
		nock('https://api.zeropush.com')
			.get('/verify_credentials')
			.reply(401, {"error":"authorization error","message":"Please provide a valid authentication token parameter or HTTP Authorization header.","reference_url":"https://zeropush.com/documentation/api_reference"});
		zeropushClient = new Zeropush(keys.server_token)
		zeropushClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
	it('pushbots result should be populated and err should be null', function(done){
		var appId = "sfjvnss"
		var secret = "ldksafjsd"
		nock('https://api.pushbots.com')
			.put('/stats')
			.reply(401, {"code":"InvalidCredentials","message":"Application ID and/or Secret unauthorized."});
		pushbotsClient = new Pushbots(appId, secret)
		pushbotsClient.validate(function(error, result){
			should.not.exist(result);
			should.exist(error);
			done()
		})
	});
});
