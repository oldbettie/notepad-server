const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../models");
const User = db.models.User;
const Auth = require("./auth");

// login user
createSession = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const result = await User.findAll({ where: { email: email } });
	if (result.length > 0) {
		bcrypt.compare(password, result[0].password, (error, response) => {
			if (response) {
				const id = result[0].id;
				const token = jwt.sign({ id }, process.env.JWT_SECRET, {
					expiresIn: "7000000 days",
				});
				req.session.user = result;

				res.json({
					auth: true,
					token: token,
					email: result[0].email,
					userId: id,
					userName: result[0].userName,
				});
			} else {
				res.json({
					auth: false,
					message: "wrong email/password combo",
				});
			}
		});
	} else {
		res.json({ auth: false, message: "email doesnt exist" });
	}
};

// session authentication this runs on every new render
getUser = async (req, res) => {
	const id = req.body.id;
	if (Auth(req).auth) {
		const result = await User.findAll({ where: { id: id } });

		res.json({
			...Auth(req),
			email: result[0].email,
			userName: result[0].userName,
			id: result[0].id,
			firstName: result[0].firstName,
			lastName: result[0].lastName,
		});
	} else {
		Auth(req);
	}
};

module.exports = {
	getUser,
	createSession,
};
