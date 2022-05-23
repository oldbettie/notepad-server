const bcrypt = require("bcrypt");
const database = require("../db/connection");
const saltRounds = 10;
//All user Controllers

registerNewUser = async (req, res) => {
	const userName = req.body.userName;
	const email = req.body.email;
	const password = req.body.password;
	const allUsers = await database.query(`SELECT * FROM Users`, []);
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
		}
		if (emailArray.includes(email)) {
			return "email already exists";
		} else {
			try {
				const result = await database.query(
					`INSERT INTO users (userName, email, password) VALUES (?,?,?)`,
					[userName, email, hash]
				);
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
		const data = await database.query(`SELECT * FROM users WHERE id = ?`, [
			req.params.id,
		]);

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