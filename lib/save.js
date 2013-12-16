var passwordHash = require("password-hash");
var debug = require("local-debug")('./save');
var sanitizeOutput = require("./sanitize-output");
var read = require("./read");
var io = require("./io");

module.exports = save;

function save (user, callback) {
  user.password = passwordHash.generate(user.password);
  user.authkey = generateAuthKey();

  debug('Saving %s', user.email);

  io.set(user.email, user, function (error) {
    if(error) return callback(error);
    read(user.email, sanitizeOutput.wrapper(callback));
  });
}

function generateAuthKey () {
  return Math.floor(Math.random()*999999999999).toString(36);
}
