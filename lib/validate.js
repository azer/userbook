var checkfor = require("checkfor");
var model = require("./model");
var validate = checkfor(model);

module.exports = wrapper;

function wrapper (options) {
  return function (content, callback) {
    callback(validate(content, options && options.ignore), content);
  }
}
