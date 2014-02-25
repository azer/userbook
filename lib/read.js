var options = require("./options");
var index = options.index();
var prefix = options.prefix();
var io = require("./io");

module.exports = read;
module.exports.email = email;

function read (key, callback) {
  io.get(prefix + ':' + index + ':' + key, callback);
}

function email (email, callback) {
  io.get(prefix + ':email:' + email, callback);
}
