const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

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

 const matchPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, matched) => {
    if (!err) {
        return resolve(matched);
    }

    return reject(err);
    });
  });
 }


 module.exports = {
     hashPassword,
     matchPassword
 }
