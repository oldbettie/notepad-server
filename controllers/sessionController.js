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
	// }); // ---
	//redirect to home
};

// Auth returns true or false and the response info if needed -- this is a test function
checkSessionStatus = (req, res) => {
	console.log(Auth(req, res));
	Auth(req, res);
};

// just for getting the login status
getUser = (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
};

deleteUser = (req, res) => {
	if (Auth(req, res)) {
	}
	res.send(`delete user with id`);
	//redirect to landing?;
};

module.exports = {
	registerNewUser,
	getUser,
	putUser,
	deleteUser,
	createSession,
	checkSessionStatus,
};
