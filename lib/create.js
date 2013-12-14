var comp = require("comp");
var sanitize = require("sanitize-object").async;
var verify = require("./verify");
var save = require("./save");

module.exports = comp(sanitize('email', 'password'),
                      verify.isValid,
                      verify.isAlreadyRegistered,
                      save);
