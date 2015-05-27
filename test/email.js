var nock = require("nock");
var should = require("chai").should();
var Mailgun = require("../lib/models/services/email/mailgun");
var Mandrill = require("../lib/models/services/email/mandrill");
var Postmark = require("../lib/models/services/email/postmark");
var Sendgrid = require("../lib/models/services/email/sendgrid");

describe('when email providers are online', function(){
	it('sendgrid result should be populated and err should be null', function(done){
		var keys = {
			apiUser : "ldksafjsd",
			apiKey : "ldksafjsd"
		}
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
});

describe('when email providers are online', function(){
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
});



describe('when the key validation function is called', function(){
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
});
