const models = require('../models');
const PasswordUtils = require('../utils/passwordUtil');
const JWT = require('../utils/jwt');

module.exports = (() => {
  const findUser = async (emailAddress) => {
    const user = await models.User.findOne({ where: { email_address: emailAddress } })
    return user;
  };

  const matchPassword = async (password, candidatePassword) => {
    const matched = await PasswordUtils.matchPasswords(candidatePassword, password);
    return matched;
  }

  const createToken = async (user) => {
    const token = await JWT.createToken(user);
    return token;
  }

  const login = (req, res) => {
    const { email_address, password } = req.body;
    findUser(email_address).then(user => {
      if (user) {
        matchPassword(user.password, password).then(() => {
          createToken(user).then(token => {
            user = user.toJSON();
            user.token = token;
            return res.status(200).json(user);
          }).catch(err => {
            return res.status(500).json(err);
          });
        }).catch(err => {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials',
            err
          });
        });
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials',
        });
      }
    }).catch(err => {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
        err
      });
    });
  };
  return {
    login
  }
})();
