var users = require("../")('./data-testing');

describe('create', function(){
  it('creates a user with an e-mail and password', function(done){
    users.create({ email: 'azer@kodfabrik.com', password: '123456', 'foo': 'bar', 'qux': 'corge' }, function (error, user) {
      if (error) return done(error);
      expect(user.email).to.equal('azer@kodfabrik.com');
      expect(user.password).to.not.exist;
      expect(user.authkey).to.exist;
      expect(user.foo).to.not.exist;
      expect(user.qux).to.not.exist;
      done();
    });
  });

  it('fails if given e-mail is already registered', function(done){
    users.create({ email: 'azer@kodfabrik.com', password: '123456' }, function (error, user) {
      expect(user).to.not.exist;
      expect(error.message).to.equal('Oops! "azer@kodfabrik.com" is already registered!');
      done();
    });
  });

  it('validates e-mail before creating new user', function(done){
    users.create({ email: 'invalid@email', password: '123' }, function (error, user) {
      expect(error).to.exist;
      expect(error.message).to.equal('"invalid@email" is an invalid e-mail.');
      expect(user).to.not.exist;
      done();
    });
  });

  it('validates e-mail before creating new user', function(done){
    users.create({ email: 'valid@email.co.uk', password: '123' }, function (error, user) {
      expect(error).to.exist;
      expect(error.message).to.equal('"password" has to be at least 6 characters long.');
      expect(user).to.not.exist;
      done();
    });
  });

  it('logins with e-mail and password', function(done){
    users.create({ email: 'loginwith@password.com', password: '123456' }, function (error) {
      if (error) return done(error);

      users.login({ email:'loginwith@password.com', password: '123456' }, function (error, user) {
        if (error) return done(error);
        expect(user.email).to.equal('loginwith@password.com');
        expect(user.password).to.not.exist;
        expect(user.authkey).to.exist;
        done();
      });
    });
  });

  it('fails to login with e-mail and password', function(done){
    users.create({ email: 'failswith@password.com', password: '12345678' }, function (error) {
      if (error) return done(error);

      users.login({ email:'failswith@password.com', password: '123456' }, function (error, user) {
        expect(error.message).to.equal('Unable to verify given password and "failswith@password.com"');
        done();
      });
    });
  });

  it('logins with auth key', function(done){
    users.create({ email: 'loginwith@key.com', password:'123456' }, function (error, record) {
      if (error) return done(error);

      users.login({ email:'loginwith@key.com', authkey: record.authkey }, function (error, user) {
        if (error) return done(error);
        expect(user.email).to.equal('loginwith@key.com');
        expect(user.password).to.not.exist;
        expect(user.authkey).to.exist;
        done();
      });
    });
  });

  it('fails with auth key', function(done){
    users.create({ email:'failwith@key.com', password: '123456' }, function (error, record) {
      if (error) return done(error);

      users.login({ email:'failwith@key.com', authkey: record.authkey+'a' }, function (error) {
        expect(error.message).to.equal('Unable to verify given auth key and "failwith@key.com"');
        done();
      });
    });
  });

  after(users.io.destroy);

});
