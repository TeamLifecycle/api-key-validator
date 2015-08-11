/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  api_key: "key-sdfsdf",
  domain: "example.io"
}
apiKeyValidator.validate("roost", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
