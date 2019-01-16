const models = require('../models');
const emailUtils = require('../utils/emailUtils');
const HashUtils = require('../utils/hashUtils');

module.exports = (() => {
  const create = (req, res) => {
    const {
      first_name,
      last_name,
      email_address,
      password,
    } = req.body;

    const user = {
      first_name,
      last_name,
      email_address,
      password,
    };


    HashUtils.makeHash(user).then(hash => {
      console.log(hash);
      user.remember_token = hash;

      models.User.create(user).then((newUser) => {
        const info = emailUtils.sendConfirmationEmail(newUser);
        info.then(message => {
          return res.status(201).json({ info: message.url })
        });
      }).catch((err) => {
        res.status(500).json(err);
      });
    }).catch(err => {
      return res.status(400).json(err);
    });
  };

  const verifyEmail = (req, res) => {
    console.log(req.query.token);
    HashUtils.verifyHash(req.query.token).then(() => {
      return res.status(200).json({ info: 'VERIFICATION_SUCCESSFUL' })
    }).catch(() => {
      return res.status(401).json({ info: 'VERIFICATION_FAILED' })
    });
  };

  return {
    create,
    verifyEmail
  };

})();






