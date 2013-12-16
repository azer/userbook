var comp = require("comp");
var sanitize = require("sanitize-object").async;
var checkfor = require("checkfor");
var verify = require("./verify");
var validate = require("./validate");
var sanitizeInput = require("./sanitize-input");
var save = require("./save");

module.exports = comp(sanitizeInput,
                      validate(),
                      verify.isAlreadyRegistered,
                      save);
