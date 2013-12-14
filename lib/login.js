var comp = require("comp");
var sanitize = require("sanitize-object").async;
var debug = require("local-debug")('login');
var verify = require("./verify");

var withPassword = comp(sanitize('email', 'authkey', 'password'),
                      verify.isValid,
                      verify.isRegistered,
                      verify.login);

var withKey = comp(sanitize('email', 'authkey'),
                              verify.isValid,
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
