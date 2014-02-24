var property = require("property");

module.exports = property();
module.exports.create = create;
module.exports.extend = extend;

function create () {
  return {
    email: { is: String, required: true, email: true },
    password: { is: String, required: true, len: [6] },
    authkey: { is: String, allowed: ['a-z', '0-9'], len: [1] }
  };
}

function extend (extras) {
  var result = create();

  if (!extras) return result;

  var key;
  for (key in extras) {
    result[key] = extras[key];
  }

  return result;
}
