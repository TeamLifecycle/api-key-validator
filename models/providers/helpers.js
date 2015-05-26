exports.objectToArray = function(obj){
	var arr = [];
	for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	        arr.push(obj[key])
	    }
	};
	return arr;
}

exports.isEmptyObject = function(obj) {
  var key;
  if (obj === null) {
    return true;
  }
  if (obj.length && obj.length > 0) {
    return false;
  }
  if (obj.length === 0) {
    return true;
  }
  for (key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

exports.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

exports.stripPhoneNumber = function(number) {
  var re;
  re = /\D/g;
  return number.toString().trim().replace(re, '');
};

exports.validatePhoneNumber = function(number) {
  var stripped;
  stripped = exports.stripPhoneNumber(number);
  return stripped.length === 11;
};

exports.validateMessage = function(msg) {
  return msg && msg.length;
};

exports.validateMailgunCall = function(keys){
	var schema = require('validate');
	var user = schema({
		apiUser: {
			type: 'string',
			required: true,
			message: 'API USER IS REQUIRED'
		},
		domain: {
			type: 'string',
			required: true,
			match: /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/,
			message: 'DOMAIN IS IMPROPER FORMAT'
		},
	});
	return user.validate(keys)
}

exports.validateMandrillCall = function(keys) {
	var schema = require('validate');
	var user = schema({
		apiKey: {
			type: 'string',
			required: true,
			message: 'API KEY IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validatePostmarkCall = function(keys){
	var schema = require('validate');
	var user = schema({
		serverKey: {
			type: 'string',
			required: true,
			message: 'SERVER KEY IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateSendgridCall = function(keys){
	var schema = require('validate');
	var user = schema({
		apiUser: {
			type: 'string',
			required: true,
			message: 'API USER IS REQUIRED'
		},
		apiKey: {
			type: 'string',
			required: true,
			message: 'API KEY IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateOnesignalCall = function(keys){
	var schema = require('validate');
	var user = schema({
		app_id: {
			type: 'string',
			required: true,
			message: 'API ID IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateParseCall = function(keys){
	var schema = require('validate');
	var user = schema({
		appID: {
			type: 'string',
			required: true,
			message: 'APP ID IS REQUIRED'
		},
		apiKey: {
			type: 'string',
			required: true,
			message: 'API KEY IS REQUIRED'
		},
	});

	return user.validate(keys)
}

exports.validatePushbotsCall = function(keys){
	var schema = require('validate');
	var user = schema({
		appId: {
			type: 'string',
			required: true,
			message: 'API ID IS REQUIRED'
		},
		secret: {
			type: 'string',
			required: true,
			message: 'SECRET IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateZeropushCall = function(keys){
	var schema = require('validate');
	var user = schema({
		server_token: {
			type: 'string',
			required: true,
			message: 'SERVER TOKEN IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateNexmoCall = function(keys){
	var schema = require('validate');
	var user = schema({
		api_key: {
			type: 'string',
			required: true,
			message: 'API KEY IS REQUIRED'
		},
		api_secret: {
			type: 'string',
			required: true,
			message: 'API SECRET IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validatePlivoCall = function(keys){
	var schema = require('validate');
	var user = schema({
		authId: {
			type: 'string',
			required: true,
			message: 'AUTH ID IS REQUIRED'
		},
		authToken: {
			type: 'string',
			required: true,
			message: 'AUTH TOKEN IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateSinchCall = function(keys){
	var schema = require('validate');
	var user = schema({
		application_key: {
			type: 'string',
			required: true,
			message: 'APPLICATION KEY IS REQUIRED'
		},
		application_secret : {
			type: 'string',
			required: true,
			message: 'APPLICATION SECRET IS REQUIRED'
		},
	});
	return user.validate(keys)
}

exports.validateTwilioCall = function(keys){
	var schema = require('validate');
	var user = schema({
		accountSid: {
			type: 'string',
			required: true,
			message: 'APPLICATION KEY IS REQUIRED'
		},
		authToken: {
			type: 'string',
			required: true,
			message: 'APPLICATION SECRET IS REQUIRED'
		},
	});
	return user.validate(keys)
}

module.exports = exports
