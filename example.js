/////////An example of validating keys for twilio///////////

var apiKeyValidator = require('./lib/index');

var keys = {
    api_user: "key-1f2dj53q21cguk34j1qv1lzee0d-bk70", //enter your own key
    domain: "email.getvenn.io" //enter your own key
}
apiKeyValidator.validate("mailgun", keys, function(err, result){
    if(err)console.log("invalid!");
    if(result)console.log("valid!");
})
