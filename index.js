var model = require("./lib/model");

module.exports = setup;

function setup (dir, extraFields) {
  require('./lib/data-dir')(dir);

  if (extraFields) extend(extraFields);

  return {
    create: require('./lib/create'),
    login: require('./lib/login'),
    io: require('./lib/io')
  };
}

function extend (extras) {
  var key;
  for (key in extras) {
    model[key] = extras[key];
  }
}
