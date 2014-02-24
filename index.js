var model = require("./lib/model");
var options = require("./lib/options");

module.exports = setup;

function setup (params, extraFields) {
  applyOptions(params);

  model(model.extend(extraFields));

  return {
    create: require('./lib/create'),
    login: require('./lib/login'),
    read: require('./lib/read'),
    io: require('./lib/io')
  };
}

function applyOptions (params) {
  if (typeof params == 'string') {
    options.dir(params);
    return;
  }

  var key;
  for (key in params) {
    if (!options[key]) continue;
    options[key](params[key]);
  }
}
