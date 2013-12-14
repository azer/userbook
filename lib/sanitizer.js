module.exports = sanitizer;
module.exports.sanitize = sanitize;

function sanitize (user) {
  delete user.password;
  return user;
}

function sanitizer (callback) {
  return function (error, record) {
    if (error) return callback(error);
    callback(undefined, sanitize(record));
  };
}
