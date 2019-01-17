const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = (() => {
  const hashPassword = password => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS).then(salt => {
        bcrypt.hash(password, SALT_ROUNDS).then(hashedPw => {
          return resolve(hashedPw);
        }).catch(err => {
          return reject(err);
        })
      }).catch(err => {
        return reject(err);
      });
    });
  }

  const matchPasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, matched) => {
        if (!err) {
          return matched ? resolve(true) : reject(false);
        }
        return reject(err);
      });
    });
  }

  return {
    hashPassword,
    matchPasswords
  }
})();
