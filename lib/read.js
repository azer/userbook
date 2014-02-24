var prefix = require("./options").prefix();
var io = require("./io");

module.exports = read;

function read (key, callback) {
  io.get(prefix + key, callback);
}
