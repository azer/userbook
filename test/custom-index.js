var users = require("../")({ index: 'name' }, {
  name: { is: String, required: true }
});

it('customizes index field', function(done){
  users.create({ email: 'span@eggs.com', name: 'eggs', password: 'abcdef' }, function (error, user) {
    if (error) return done(error);

    users.io.get('users:eggs', function (error, sameuser) {
      if (error) return done(error);

      expect(user.authkey).to.equal(sameuser.authkey);

      users.login({ name: 'eggs', password: 'abcdef' }, done);
    });
  });
});

after(users.io.destroy);
