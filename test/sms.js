var nock = require("nock");
var should = require("chai").should();
var Nexmo = require("../models/providers/sms/nexmo");
var Plivo = require("../models/providers/sms/plivo");
var Sinch = require("../models/providers/sms/sinch");
var Twilio = require("../models/providers/sms/twilio");


describe('when email providers are online', function(){
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
});



describe('when email providers are online', function(){
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
});



describe('when email providers are online', function(){
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
});
