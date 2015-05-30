/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  server_token : "iosdev_gvj8yDWUJHGVGQLmALzJHCF",
}
apiKeyValidator.validate("zeropush", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
