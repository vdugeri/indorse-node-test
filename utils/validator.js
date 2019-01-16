const isEmpty = object => Object.keys(object).length === 0;

const validate = (req, res, next) => {
  const errors = {};
  if (!req.body.first_name) {
    errors.firstname = 'required';
  }

  if (!req.body.last_name) {
    errors.last_name = 'required';
  }

  if (!req.body.email_address) {
    errors.email_address = 'required';
  }

  if (!req.body.password) {
    errors.password = 'required';
  }

  console.log(errors);

  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  }

  return next();
};

module.exports = {
  validate,
};
