var prefix = require("./options").prefix();
var io = require("./io");

module.exports = read;
module.exports.email = email;

function read (key, callback) {
  io.get(prefix + key, callback);
}

function email (email, callback) {
  io.get(prefix + email, callback);
}
