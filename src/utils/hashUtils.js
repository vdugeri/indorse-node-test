const bcrypt = require('bcrypt');
const models = require('../models');
const SALT_ROUNDS = 10;

module.exports = (() => {
  const makeHash = async user => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS).then(salt => {
        bcrypt.hash(user.email_address, salt).then(hash => {
          return resolve(hash);
        }).catch(err => {
          return reject(err);
        })
      }).catch(err => {
        return reject(err);
      });
    });
  }

  const verifyHash = hash => {
    return new Promise((resolve, reject) => {
      models.User.findAll({ where: { remember_token: hash } })
        .then(user => {
          if (Object.keys(user).length > 0) {
            return resolve();
          }
          return reject();
        }).catch(err => {
          return reject();
        });
    })
  };

  return {
    makeHash,
    verifyHash
  }
})();
