var comp = require("comp");
var debug = require("local-debug")('login');
var sanitize = require("./sanitize-input");
var validate = require("./validate");
var verify = require("./verify");

var withPassword = comp(sanitize,
                        validate({ ignore: 'password' }),
                        verify.isRegistered,
                        verify.login);

var withKey = comp(sanitize,
                   validate({ ignore: 'password' }),
                   verify.isRegistered,
                   verify.loginWithKey);

module.exports = login;

function login (options, callback) {
  debug('Login as %s. Auth Key: %s', options.email, options.authkey);

  if (options.authkey) return withKey(options, callback);

  return withPassword(options, function (error, record) {
    if (error) return callback(error);
    callback(undefined, record);
  });
}
