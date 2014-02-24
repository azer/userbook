var checkfor = require("checkfor");
var model = require("./model")();
var index = require("./options").index();

var loginModel = {
  password: model.password,
  authkey: model.authkey
};

var validate = checkfor(loginModel);

loginModel[index] = model[index];

module.exports = wrapper;

function wrapper (options) {
  return function (content, callback) {
    callback(validate(content, options && options.ignore), content);
  }
}
