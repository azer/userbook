module.exports = setup;

function setup (dir) {
  require('./lib/data-dir')(dir);

  return {
    create: require('./lib/create'),
    login: require('./lib/login'),
    io: require('./lib/io')
  };
}
