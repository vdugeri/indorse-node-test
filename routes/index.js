const controllers = require('../controllers');
const Validator = require('../utils/validator');


const VERSION = process.env.API_VERSION;

module.exports = (app) => {
  app.post(`/api/${VERSION}/auth/login`, controllers.AuthController.login);
  app.post(`/api/${VERSION}/users`, Validator.validate, controllers.UserController.create);
  app.get(
    `/api/${VERSION}/emails/verify`,
    controllers.UserController.verifyEmail,
  );
};
