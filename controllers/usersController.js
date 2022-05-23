const bcrypt = require("bcrypt");
const saltRounds = 10;
const { db } = require("../models");
const User = db.models.User;

//All user Controllers

registerNewUser = async (req, res) => {
	const userName = req.body.userName;
	const email = req.body.email;
	const password = req.body.password;
	console.log(email);
	// sequeliser ----
	const allUsers = await User.findAll();
	const emailArray = [];
	if (allUsers.length > 0) {
		allUsers.map((user) => {
			emailArray.push(user.email);
		});
	}
	// added working controller
	bcrypt.hash(password, saltRounds, async (err, hash) => {
		if (err) {
			console.log(err);
			return res.send(err);
		}
		if (emailArray.includes(email)) {
			return res.send("email already exists");
		} else {
			try {
				// for sequealizer ---
				const result = await User.create({
					userName: userName,
					email: email,
					password: hash,
				});
				res.json(result);
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		}
	});
	//redirect to user profile ------
};

getUser = async (req, res) => {
	try {
		// for sequaliser ----
		const data = await User.findAll({
			where: { id: req.params.id },
		});

		if (!data) {
			console.log(data);
			throw new Error(data, "data error");
		} else {
			res.json(data);
			console.log(data);
		}
	} catch (err) {
		res.send({ error: err });
	}
};

putUser = (req, res) => {
	res.send(`update user. populated user form`);
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
};