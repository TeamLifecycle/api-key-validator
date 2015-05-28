/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  auth_id : "MAM2EYYWY0NDK0MWNLN2",
  auth_token : "YzVmZGIxMGNkODUwMjZjZThhZGE3MjQ1MWM1NmEw"
}
apiKeyValidator.validate("plivo", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
