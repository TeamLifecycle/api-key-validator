var nock = require("nock");
var should = require("chai").should();
var Parse = require("../lib/models/services/push/parse");
var Zeropush = require("../lib/models/services/push/zeropush");
var Onesignal = require("../lib/models/services/push/onesignal");
var Pushbots = require("../lib/models/services/push/pushbots");

describe('when email providers are online', function(){
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
});



describe('when email providers are online', function(){
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
});



describe('when the key validation function is called', function(){
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
