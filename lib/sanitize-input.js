var model = require("./model");
var sanitizeObject = require("sanitize-object").async;

module.exports = sanitizeObject.apply(undefined, Object.keys(model));
