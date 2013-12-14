var passwordHash = require("password-hash");
var debug = require("local-debug")('./save');
var sanitizer = require("./sanitizer");
var read = require("./read");
var io = require("./io");

module.exports = save;

function save (user, callback) {
  var record = {
    email: user.email,
    password: passwordHash.generate(user.password),
    authkey: generateAuthKey()
  };

  debug('Saving %s', user.email);

  io.set(user.email, record, function (error) {
    if(error) return callback(error);
    read(user.email, sanitizer(callback));
  });
}

function generateAuthKey () {
  return Math.floor(Math.random()*999999999999).toString(36);
}
