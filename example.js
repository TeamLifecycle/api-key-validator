/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
    auth_id: "MAM2EYYWY0NDK0MWNLN2", //enter your own key
    auth_token: "YzVmZGIxMGNkODUwMjZjZThhZGE3MjQ1MWM1NmEw" //enter your own key
}
apiKeyValidator.validate("plivo", keys, function(err, result){
    if(err)console.log("invalid!");
    if(result)console.log("valid!");
})
