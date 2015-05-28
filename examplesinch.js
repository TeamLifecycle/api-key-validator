/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
  app_id : "1c17c176-fe50-11e4-b596-5f4543d85ec3",
  api_key : "MWMxN2MxZjgtZmU1MC0xMWU0LWI1OTctZjM2MzdkYzA5MGQ4"
}
apiKeyValidator.validate("onesignal", keys, function(err, result){
  if(err)console.log("invalid!");
  if(result)console.log("valid!");
})
