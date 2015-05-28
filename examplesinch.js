/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  application_key : "0cd65f82-d825-4279-aeb0-97dcf57541ba",
  application_secret : "tMNQnM6SG0iwcLOCWXWeSw=="
}
apiKeyValidator.validate("sinch", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
