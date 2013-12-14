var io = require("./io");

module.exports = read;

function read (email, callback) {
  io.get(email, callback);
}
