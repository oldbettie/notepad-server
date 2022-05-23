const bcrypt = require("bcrypt");
const db = require("../models/indexs3");
const jwt = require("jsonwebtoken");

// login user
createSession = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// sequelise ---
	// const result = await User.findAll({where: {email: email}})

	db.query(`SELECT * FROM users WHERE email = ?;`, email, (err, result) => {
		if (err) {
			res.send({ error: err });
		}
		// ---
		if (result.length > 0) {
			bcrypt.compare(password, result[0].password, (error, response) => {
				if (response) {
					const id = result[0].id;
					const token = jwt.sign({ id }, process.env.JWT_SECRET, {
						expiresIn: 600,
					});
					req.session.user = result;

					res.json({
						auth: true,
						token: token,
						email: result[0].email,
						userId: id,
					});
				} else {
					res.send({
						message: "wrong email/password combo",
					});
				}
			});
		} else {
			res.send({ message: "email doesnt exist" });
		}
	}); // ---
	//redirect to home
};

checkSessionStatus = (req, res) => {
	res.send("yo you are authenticated");
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
