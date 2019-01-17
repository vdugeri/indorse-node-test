const jsonwebtoken = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = (() => {
  const createToken = (user) => {
    return new Promise(resolve => {
      const token = jsonwebtoken.sign({
        data: user.email_address,
      }, TOKEN_SECRET, { expiresIn: '24h' });

      return resolve(token);
    });
  };

  const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(ecoded);
      });
    });
  };

  return {
    createToken,
    verifyToken
  }
})();
