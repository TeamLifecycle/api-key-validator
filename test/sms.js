var nock = require("nock");
var should = require("chai").should();
var Nexmo = require("../lib/models/services/sms/nexmo");
var Plivo = require("../lib/models/services/sms/plivo");
var Sinch = require("../lib/models/services/sms/sinch");
var Twilio = require("../lib/models/services/sms/twilio");


describe('sms providers', function(){
	describe('with valid keys', function(){
		it('twilio result should be populated', function(done){
			var keys = {
			  account_sid : "ldksafjsd",
			  auth_token : "ldksafjsd"
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
		it('nexmo result should be populated', function(done){
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
		it('plivo result should be populated', function(done){
			var keys = {
			  auth_id : "ldksafjsd",
			  auth_token : "ldksafjsd"
			}
			nock('https://api.plivo.com/v1')
			  .get('/Account/ldksafjsd')
			  .reply(200, {"status": "sent"});
			var plivoClient = new Plivo(keys)
			plivoClient.validate(function(error, result){
			  should.exist(result);
			  should.not.exist(error);
			  done()
			})
		});
		it('sinch result should be populated', function(done){
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




	describe('with invalid keys', function(){
		    it('twilio err object should be populated', function(done){
				var keys = {
					account_sid : "ldksafjsd",
					auth_token : "ldksafjsd"
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
			it('nexmo err object should be populated', function(done){
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
			it('plivo err object should be populated', function(done){
				var keys = {
					auth_id : "ldksafjsd",
					auth_token : "ldksafjsd"
				}
				nock('https://api.plivo.com/v1')
					.get('/Account/ldksafjsd')
					.reply(500, {"error-code":"401","error-code-label":"authentication failed"});
				var plivoClient = new Plivo(keys)
				plivoClient.validate(function(error, result){
					should.not.exist(result);
					should.exist(error);
					done()
				})
			});
		  it('sinch err object should be populated', function(done){
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




	describe('when the key validation function is called', function(){
	  it('should return an error if the a parameter is missing', function(done){
			var keys = {
				account_sid : "",
				auth_token : "ldksafjsd"
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
		it('twilio should return an error if the a parameter is missing', function(done){
			var keys = {
				account_sid : "ldksafjsd",
				auth_token : ""
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
		it('plivo should return an error if the a parameter is missing', function(done){
			var keys = {
				auth_id : "",
				auth_token : "ldksafjsd"
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
		it('plivo should return an error if the a parameter is missing', function(done){
			var keys = {
				auth_id : "ldksafjsd",
				auth_token : ""
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
});
