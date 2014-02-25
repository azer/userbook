var debug = require("local-debug")('validate');
var newError = require("new-error");
var passwordHash = require("password-hash");
var index = require('./options').index();
var sanitizeOutput = require("./sanitize-output");
var read = require('./read');

module.exports = {
  isRegistered: isRegistered,
  isAlreadyRegistered: isAlreadyRegistered,
  login: login,
  loginWithKey: loginWithKey
};

function isRegistered (user, callback) {
  var key = user[index] || user.email;

  debug('Making sure %s is registered', key);

  read(key, function (error) {
    if (error) {
      debug('Oops, %s is not registered yet.', key);
      return callback(newError("Oops! \"{0}\" is not registered yet!", key));
    }

    callback(undefined, user);
   });
}

function isAlreadyRegistered (user, callback) {
  read(user[index], function (error) {
    if (!error) {
      debug('Oops, "%s" is already registered.', user[index]);
      return callback(newError("Oops! \"{0}\" is already registered!", user[index]));
    }

    if (index == 'email') return callback(undefined, user);

    read.email(user.email, function (error) {
      if (!error) {
        debug('Oops, "%s" is already registered.', user.email);
        return callback(newError("Oops! \"{0}\" is already registered!", user.email));
      }

      callback(undefined, user);
    });
  });
}

function login (user, callback) {
  read(user[index], function (error, record) {
    if (error) return callback(error);

    if (!passwordHash.verify(user.password, record.password)) {
      debug('Failed to login as %s with password', user[index]);
      return callback(newError("Unable to verify given password and \"{0}\"", user[index]));
    }

    callback(undefined, sanitizeOutput(record));
  });
}

function loginWithKey (user, callback) {
  read(user[index], function (error, record) {
    if (error) return callback(error);

    if (user.authkey != record.authkey) {
      debug('Failed to login as %s with auth key', user[index]);
      return callback(newError("Unable to verify given auth key and \"{0}\"", user[index]));
    }

    callback(undefined, sanitizeOutput(record));
  });
}
