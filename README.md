# Venn Email

[ ![Codeship Status for VennHQ/api-key-validation](CHANGEhttps://codeship.com/projects/40a5efb0-c00d-0132-200e-021ec7688aff/status?branch=master)](CHANGEhttps://codeship.com/projects/73117)

Validate api keys for major email, sms, or push notification providers quickly and easily. Catch the problem early.


## Installation
``` bash
npm install api-key-validation
```

## Email

Parameters : (service, keys)
_________________________________
| "mailgun", {api_user, domain}  |
| "mandrill", {api_key}          |
| "postmark", {server_key}       |
| "sendgrid, {sendgrid}          |

#### initialize(service, keys)
#### Example
``` javascript
var apiKeyValidator = require('api-key-validation');

var keys = {
    apiUser: "123123",
    apiKey: "2342394"
}
apiKeyValidator.validate("sendgrid", keys, function(err, result){
    console.log(err, result);
})
	// api key valid if no error
});
```

## SMS

Parameters : (service, keys)
_________________________________
| "nexmo", {api_key, api_secret}                 |
| "plivo", {auth_id, auth_token}                 |
| "sinch", {application_key, application_secret} |
| "twilio, {account_sid, auth_token}             |

#### initialize(keys)

#### validate(callback)
|example                                      |
|---------------------------------------------|
|mandrillKeyVal.validate(function(err,result) |

#### Example
``` javascript
var apiKeyValidator = require('api-key-validation');

var keys = {
	account_sid : "ldksafjsd",
	auth_token : "ldksafjsd"
}
apiKeyValidator.validate("twilio", keys, function(err, result){
    console.log(err, result);
})
	// api key valid if no error
});
```

## Push Notification

Parameters : (service, keys)
_________________________________
| "onesignal", {app_id}         |
| "parse", {app_id, api_key}    |
| "pushbots", {app_id, secret}  |
| "zeropush, {server_token}     |

#### initialize(keys)

#### validate(data, callback)
|params       |type   |description             |example                    |
|-------------|-------|------------------------|---------------------------|
|Service      |String |name of service provider|twilio                     |
|keys         |String |dictionary of keys      |{apiKey : 64d2fa24h3sp3e8} |

#### Example
``` javascript
var apiKeyValidator = require('api-key-validation');

var keys = {
    api_id: "123123",
    api_key: "2342394"
}
apiKeyValidator.validate("parse", keys, function(err, result){
    console.log(err, result);
})
	// api key valid if no error
});
```

## Development

### Install Dependencies
``` bash
npm install
```

### Run Examples
``` bash
node example.js
```

### Run Tests
``` bash
mocha
```

### Adding a New Service Provider
1. Write Failing Tests
  1. If new service type, create a new test file of the form
		 `test/service_type.js`.
  2. Copy `test/test_template.js` into the newly created file or
	   the file corresponding to the service type of the new provider.
  3. Follow instructions in the template file to create tests for the new
	   service
2. Create the New Service Provider
  1. Install the service provider's npm package as a dependency
  2. Create a new file of the form `lib/models/services/service_type
	   /provider_name.js`
  3. Decide how you want to test if the provided keys are valid.
		 Refer to the service's api documentation to call a function
		 or hit an end point that will authenticate or result in an error.
  4. Return a callback making sure that error is null and result is
		 populated if the keys are verified and error is populated and result is
		 null if they are not.
3. Edit `lib/index.js`
  1. Require the newly created service provider
  ``` javascript
  var ServiceName = require('./providers/service_type/service_name');
  ```
  2. Add the newly created service provider to `apiKeyValidator`
  ``` javascript
	if (service == "serive_name") Serive_name.validate(keys);
  ```
