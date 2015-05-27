/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('lib/index');

var keys = {
    api_key: "123123", //enter your own api_key
    auth_token: "2342394" //enter your own auth_token
}
apiKeyValidator.validate("twilio", keys, function(err, result){
    console.log(err, result);
})

module.exports = Twilio;
