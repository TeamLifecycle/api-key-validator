/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  app_id : "555b9dd71sfsgs779595a378b456a",
}
apiKeyValidator.validate("pushbots", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
