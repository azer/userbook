var comp = require("comp");
var debug = require("local-debug")('login');
var newError = require("new-error");
var index = require("./options").index();
var read = require("./read");
var sanitize = require("./sanitize-input");
var validate = require("./validate-login");
var verify = require("./verify");

var withPassword = comp(sanitize,
                        validate({ ignore: ['authkey'] }),
                        verify.isRegistered,
                        verify.login);

var withKey = comp(sanitize,
                   validate({ ignore: ['password'] }),
                   verify.isRegistered,
                   verify.loginWithKey);

module.exports = login;

function login (options, callback) {
  if (index != 'email' && !options.hasOwnProperty(index))
    return withEmailFallback(options, callback);

  return withDefaultIndex(options, callback);
}

function withEmailFallback (options, callback) {
  debug('Logging with e-mail "%s". Auth Key: %s', options.email, options.authkey);

  read.email(options.email, function (error, key) {
    if (error) {
      callback(newError('Oops! "{0}" is not registered yet!'));
      return;
    }

    options[index] = key;

    if (options.authkey) return withKey(options, callback);

    return withPassword(options, function (error, record) {
      if (error) return callback(error);
      callback(undefined, record);
    });

  });
}

function withDefaultIndex (options, callback) {
  debug('Logging in as "%s". Auth Key: %s', options[index], options.authkey);

  if (options.authkey) return withKey(options, callback);

  return withPassword(options, function (error, record) {
    if (error) return callback(error);
    callback(undefined, record);
  });
}
