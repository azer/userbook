var io = require('level-client')('./data-custom-client');
var users = require("../")({ io: io });

describe('io', function(){
  it('reuses given client rather than creating a new one', function(done){
    users.create({ email: 'foo@bar.com', password: 'abcdef' }, function (error, user) {
      if (error) return done(error);

      users.read('foo@bar.com', function (error, sameuser) {
        if (error) return done(error);

        expect(user.authkey).to.equal(sameuser.authkey);
        done();
      });
    });
  });

  after(io.destroy);
});
