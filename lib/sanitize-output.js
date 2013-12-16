module.exports = sanitize;
module.exports.wrapper = wrapper;

function sanitize (user) {
  delete user.password;
  return user;
}

function wrapper (callback) {
  return function (error, record) {
    if (error) return callback(error);
    callback(undefined, sanitize(record));
  };
}
