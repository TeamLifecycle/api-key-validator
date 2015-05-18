var nock = require("nock")

describe('when email api keys are valid', function(){
	it('err should be NULL when key is valid and populated when it is not'), function(){
		nock.cleanAll()
		"sendgrid": {
					"api_user": "sldkfjdslkjf",
					"api_key": "sldkfjdslkjf"
				},
				"mandrill": {
					"api_key": "sldkfjdslkjf"
				}
	})
});