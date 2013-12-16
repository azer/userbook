module.exports = {
  email: { is: String, required: true, email: true },
  password: { is: String, required: true, len: [6] },
  authkey: { is: String, allowed: ['a-z', '0-9'], len: [1] }
};
