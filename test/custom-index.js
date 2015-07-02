var users = require("../")({ index: 'name' }, {
  name: { is: String, required: true }
});

it('customizes index field', function(done){
  users.create({ email: 'span@eggs.com', name: 'eggs', password: 'abcdef' }, function (error, user) {
    if (error) return done(error);

    users.io.get('users:name:eggs', function (error, sameuser) {
      if (error) return done(error);

      expect(user.authkey).to.equal(sameuser.authkey);

      users.io.get('users:email:span@eggs.com', function (error, name) {
        if (error) return done(error);

        expect(name).to.equal('eggs');

        users.io.get('users:authkey:'+ user.authkey, function (error, name) {
          expect(name).to.equal('eggs');
          users.login({ name: 'eggs', password: 'abcdef' }, done);
        });
      });
    });
  });
});

it('doesnt allow users with same index value', function(done){
  users.create({ email: 'span2@eggs.com', name: 'eggs', password: '123456' }, function (error) {
    expect(error).to.exist;
    expect(error.message).to.equal('Oops! "eggs" is already registered!');
    done();
  });
});

it('still doesnt allow users with same email', function(done){
  users.create({ email: 'span@eggs.com', name: 'new eggs', password: '123456' }, function (error) {
    expect(error).to.exist;
    expect(error.message).to.equal('Oops! "span@eggs.com" is already registered!');
    done();
  });
});

it('still accepts logging in with e-mail', function(done){
  users.create({ email: 'foo@bar.com', name: 'foo', password: 'abcdef' }, function (error, user) {
    if (error) return done(error);

    users.login({ email: 'foo@bar.com', 'authkey': user.authkey }, function (error, sameuser) {
      if (error) return done(error);

      expect(sameuser.authkey).to.equal(user.authkey);
      done();
    });
  });
});

after(users.io.destroy);
