const db = require("./connection");

async function getNotes() {
	try {
		const result = await db.query(`SELECT * FROM Notes`, []);
		return result;
	} catch (err) {
		console.error(err);
	}
}

async function postNote(inData) {
	try {
		await db.query(
			`INSERT INTO Notes (user_id, subject_id, text, timestamp, x-axis, y-axis) VALUES (?,?,?,?,?,?)`,
			inData
		);
	} catch (err) {
		console.error(err);
	}
}

// async function getUsers() {
// 	try {
// 		const result = await db.query(`SELECT * FROM Users`, []);
// 		return result;
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
// async function getUser(id) {
// 	try {
// 		const data = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
// 		return data;
// 	} catch (err) {
// 		console.log(err);
// 		return err;
// 	}
// }

module.exports = {
	getNotes,
	postNote,
};
