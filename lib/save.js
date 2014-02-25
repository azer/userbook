var passwordHash = require("password-hash");
var debug = require("local-debug")('./save');
var options = require("./options");
var prefix = options.prefix();
var index = options.index();
var sanitizeOutput = require("./sanitize-output");
var read = require("./read");
var io = require("./io");

module.exports = save;

function save (user, callback) {
  user.password = passwordHash.generate(user.password);
  user.authkey = generateAuthKey();

  var key = prefix + user[index];

  debug('Saving %s', key);

  io.set(key, user, function (error) {
    if(error) return callback(error);

    if (index == 'email') return read(user[index], sanitizeOutput.wrapper(callback));

    debug('Binding %s with %s', prefix + user.email, user[index]);

    io.set(prefix + user.email, user[index], function (error) {
      if(error) return callback(error);
      read(user[index], sanitizeOutput.wrapper(callback));
    });
  });
}

function generateAuthKey () {
  return Math.floor(Math.random()*999999999999).toString(36);
}
