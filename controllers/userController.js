const models = require('../models')

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

		models.User.create(user).then((newUser) => {
			res.status(201).json(newUser);
		}).catch((err) => {
			res.status(500).json(err);
		});
	};

	const verifyEmail = (req, res) => {

	};

	return {
		create,
		verifyEmail
	};

})();






