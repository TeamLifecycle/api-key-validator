/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  api_user: "key-dsfsdfsd",
  domain: "example.io"
}
apiKeyValidator.validate("mailgun", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
