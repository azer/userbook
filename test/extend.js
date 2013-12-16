var users = require("../")('./data-testing', {
  username: { is: String, required: true },
  lastseen: Number
});

describe('extending', function(){

  it('allows extending the basic user model', function(done){
    users.create({ username: 'azer', email: 'azer@kodfabrik.com', password: '123456' }, function (error, user) {
      if (error) return done(error);
      expect(user.username).to.equal('azer');
      expect(user.email).to.equal('azer@kodfabrik.com');
      expect(user.password).to.not.exist;
      expect(user.authkey).to.exist;
      done();
    });
  });

  after(users.io.destroy);
});
