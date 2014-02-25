var propertify = require("propertify");

module.exports = propertify({
  dir: 'data-userbook',
  prefix: 'users',
  index: 'email',
  io: undefined
});
