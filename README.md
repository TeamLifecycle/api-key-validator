# API Key Validator &nbsp;&nbsp;![image of lock](https://cloud.githubusercontent.com/assets/9973419/7895501/067b4474-0660-11e5-9c3a-d0ef4c141ee2.gif)

[ ![Codeship Status for VennHQ/api-key-validator](https://codeship.com/projects/84e0b4a0-e605-0132-9e91-46daeabcd7f9/status?branch=master)](https://codeship.com/projects/82171)


Validate api keys for major email, sms, or push notification providers quickly and easily. Catch the problem early.


## Installation
``` bash
npm install api-key-validator
```

## Validate (serviceName, keys, callback)

|serviceName | keys |
|------------|---------------------------------------|
| "mailgun"  | {api_key, domain}                    |
| "mandrill" | {api_key}                             |
| "postmark" | {server_key}                          |
| "sendgrid" | {api_user, api_key}                   |
| "nexmo"    | {api_key, api_secret}                 |
| "plivo"    | {auth_id, auth_token}                 |
| "sinch"    | {application_key, application_secret} |
| "twilio"   | {account_sid, auth_token}             |
| "onesignal"| {app_id, api_key}                     |
| "parse"    | {app_id, api_key}                     |
| "pushbots" | {app_id}                              |
| "zeropush" | {server_token}                        |


#### Example
``` javascript
var apiKeyValidator = require('api-key-validator');

var keys = {
    api_user: "cx34554cvd234sdfsd34fsdf123123",
    api_key: "2342334534fbdf29sdfsbfbdfsd4"
}

apiKeyValidator.validate("sendgrid", keys, function(err, result){
    console.log(err, result);
});

```

## Development
Want to add a service not currently supported? Feel free to add it yourself and send a pull request!

#### Install Dependencies
``` bash
npm install
```

#### Run Examples
``` bash
node example.js
```

#### Run Tests
``` bash
mocha
```

#### Adding a New Service Provider
1. Write Failing Tests
  1. If new service type, create a new test file of the form
		 `test/service_type.js`.
  2. Copy `test/test_template.js` into the newly created file or
	   the file corresponding to the service type of the new provider.
  3. Follow instructions in the template file to create tests for the new
	   service
2. Create the New Service Provider
  1. Install the service provider's npm package as a dependency, or hit their rest API through npm request package
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
  ```js
  var ServiceName = require('./providers/service_type/service_name');
  ```
  2. Add the newly created service provider to `apiKeyValidator`
  ``` javascript
	if (service == "service_name") Service_name.validate(keys);
  ```
