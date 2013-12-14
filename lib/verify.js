var debug = require("local-debug")('validate');
var newError = require("new-error");
var passwordHash = require("password-hash");
var sanitize = require("./sanitizer").sanitize;
var io = require("./io");

module.exports = {
  isRegistered: isRegistered,
  isAlreadyRegistered: isAlreadyRegistered,
  isValid: isValid,
  login: login,
  loginWithKey: loginWithKey
};

function isRegistered (user, callback) {
  debug('Making sure %s is registered', user.email);

  io.get(user.email, function (error) {
    if (error) {
      debug('Oops, %s is not registered yet.', user.email);
      return callback(newError("Oops! {0} is not registered yet!", user.email));
    }

    callback(undefined, user);
   });
}

function isAlreadyRegistered (user, callback) {
  io.get(user.email, function (error) {
    if (!error) {
      debug('Oops, %s is already registered.', user.email);
      return callback(newError("Oops! {0} is already registered!", user.email));
    }

    callback(undefined, user);
  });
}

function isValid (user, callback) {
  debug('Validating %s', user && user.email);

  if (!user || !user.email || (!user.password && !user.authkey))
    return callback(newError('E-mail and password/authkey required!'));

  if (!user.email || user.email.length < 6 || !/^[\w\.\+\-]+@[\w\-]+\.[\w\.]{2,5}$/.test(user.email))
    return callback(newError('Invalid e-mail: "{0}"', user.email));

  if (user.password && (!user.password || user.password.length < 6))
    return callback(newError('Invalid password: "{0}"', user.password));

  if (user.authkey && (!user.authkey || user.authkey.length < 1))
    return callback(newError('Invalid authkey: "{0}"', user.authkey));

  debug('%s gave us valid e-mail and password.', user.email);

  callback(undefined, user);
}

function login (user, callback) {
  io.get(user.email, function (error, record) {
    if (error) return callback(error);

    if (!passwordHash.verify(user.password, record.password)) {
      debug('Failed to login as %s with password', user.email);
      return callback(newError("Unable to verify given password and \"{0}\"", user.email));
    }

    callback(undefined, sanitize(record));
  });
}

function loginWithKey (user, callback) {
  io.get(user.email, function (error, record) {
    if (error) return callback(error);

    if (user.authkey != record.authkey) {
      debug('Failed to login as %s with auth key', user.email);
      return callback(newError("Unable to verify given auth key and \"{0}\"", user.email));
    }

    callback(undefined, sanitize(record));
  });
}
