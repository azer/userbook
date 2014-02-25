var users = require("../")({ prefix: 'people' });

it('chooses a custom prefix rather than "users:"', function(done){
  users.create({ email: 'hi@azer.com', password: 'abcdef' }, function (error, user) {
    if (error) return done(error);

    users.io.get('people:email:hi@azer.com', function (error, sameuser) {
      if (error) return done(error);

      expect(user.authkey).to.equal(sameuser.authkey);
      done();
    });
  });
});

after(users.io.destroy);
