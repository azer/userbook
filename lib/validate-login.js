var debug = require("local-debug")('validate-login');
var checkfor = require("checkfor");
var model = require("./model")();
var index = require("./options").index();

var loginModel = {
  email: model.email,
  password: model.password,
  authkey: model.authkey
};

var validate = checkfor(loginModel);

if (index != 'index') {
  debug('%s will also be required for login.');
  loginModel[index] = model[index];
}

module.exports = wrapper;

function wrapper (options) {
  return function (content, callback) {
    if(index != 'email') {
      options.ignore.push('email');
    }

    callback(validate(content, options.ignore), content);
  }
}
