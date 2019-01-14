const controllers = require('../controllers');

const VERSION = process.env.API_VERSION;

module.exports = (app) => {
  app.post(`api/${VERSION}/auth/login`, controllers.AuthController.login);
  app.post(`api/${VERSION}/users`, controllers.UserController.create);
  app.get(
    'api/{VERSION}/emails/verify',
    controllers.UserController.verifyEmail,
  );
};
