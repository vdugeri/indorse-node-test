

module.exports = (() => {
  const isEmpty = object => Object.keys(object).length === 0;

  const validate = (req, res, next) => {
    console.log(req.body);
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

    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    return next();
  };

  return {
    validate,
  }
})();
