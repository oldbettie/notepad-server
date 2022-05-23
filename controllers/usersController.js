const bcrypt = require("bcrypt");
const db = require("../models");
const saltRounds = 10;
//All user Controllers

registerNewUser = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		// maybe works??
		const allUsers = db.query(`SELECT * FROM users`, []);
		const emailArray = [];
		allUsers.map((user) => {
			emailArray.push(user.email);
		});
		if (emailArray.includes(email)) {
			return "email already exists";
		} else {
			db.query(
				`INSERT INTO users (username, email, password) VALUES (?,?)`,
				[username, email, hash],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						console.log(result);
						res.send(result);
					}
				}
			);
		}
	});
	//redirect to user profile ------
};

getUser = (req, res) => {
	db.query(
		`SELECT * FROM users WHERE id = ?`,
		req.params.id,
		(err, result) => {
			if (err) {
				res.send({ error: err });
			}
			if (res.length > 0) {
				res.json(result);
			} else {
				res.send({ message: "user doesnt exist" });
			}
		}
	);
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
