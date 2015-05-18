var nock = require("nock")
var should = require("chai").should()

describe('when email api keys are valid', function(){
	it('result should should be populated and err should be null', function(done){
		// have service name and api keys
		// initialize provider client with key
		// validate keys by calling a function
		// return callback of (err, result)

		var service = "sendgrid"
		var apiUser = "ldksafjsd"
		var apiKey = "ldksafjsd"

		// sendgridClient = new Sendgrid(apiUser, apiKey)
		sendgridClient.client().validate(function(error, result){
			should.exist(result);
			should.not.exist(error);
			done()
		})

	});
});