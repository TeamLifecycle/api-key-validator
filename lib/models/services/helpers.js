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

module.exports = exports
