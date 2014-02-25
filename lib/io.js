var options = require("./options");

module.exports = require('level-json')(options.io() || options.dir());
