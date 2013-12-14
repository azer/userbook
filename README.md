## userbook

LevelDB Based Module To Store And Manage Users.

## Install

```bash
$ npm install userbook
```

## Usage

Creating a user:

```js
users = require('userbook')('./data-users')

users.create({ email: 'foo@bar.com', password: 123456 }, function (error, user) {

  user.authkey
  // => a3B21c

})
```

Login with username and password:

```js
users.login({ email: 'foo@bar.com', password: 123456 }, function (error, record) {

  record.authkey
  // => a3B21c

})
```

Login with username and authkey:

```js
users.login({ email: 'foo@bar.com', authkey: 'a3B21c' }, function (error, record) {

  record.email
  // => foo@bar.com

  record.authkey
  // => a3B21c

})
```

To just read a record:

```js
users.read('foo@bar.com', function (error, user) {
  user.authkey
  // => a1B23d
})
```
