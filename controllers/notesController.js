//All notes controllers
const { db } = require("../models");
const Note = db.models.Note;
const User = db.models.User;
const session = require("./sessionController");
const Auth = require("./auth");

postNewNote = (req, res) => {
	//requires elem.getBoundingClient() result from client to change location
	if (Auth(req).auth) {
		const { note_text, x_axis, y_axis, subjectId, userId } = req.body;
		try {
			Note.create({
				note_text,
				x_axis,
				y_axis,
				subjectId,
				userId: userId, //needs to be from req.body
			}).then(() => {
				res.status(200).json({ message: "note created" });
			});
		} catch (err) {
			res.send({ error: err });
		}
	} else {
		res.json(Auth(req.auth));
	}
};

// dont think we need this function in final
getNote = (req, res) => {
	const id = req.params.id; //note_id
	if (Auth(req).auth) {
		try {
			Note.findAll({
				where: { id },
			}).then((note) => {
				res.status(200).json(note);
			});
		} catch (err) {
			res.send({ error: err });
		}
	}
};

// needs where: subjectID = passed in subject id
getNotes = (req, res) => {
	try {
		Note.findAll({
			where: { subjectId: req.params.id },
			include: [{ model: User }],
		}).then((notes) => {
			res.status(200).json(notes);
		});
	} catch (err) {
		res.send({ error: err });
	}
};

// dont think we need this func in final
// getUserNotes = (req, res) => {
// 	session.getUser().then(({ id }) => {
// 		try {
// 			Note.findAll({
// 				where: { id },
// 			}).then((notes) => {
// 				res.status(200).json(notes);
// 			});
// 		} catch (err) {
// 			res.send({ error: err });
// 		}
// 	});
// };

putNote = (req, res) => {
	//requires elem.getBoundingClient() result from client to change location
	if (Auth(req).auth) {
		const id = req.params.id;
		const { note_text, x_axis, y_axis } = req.body;
		try {
			Note.update(
				{
					note_text,
					x_axis,
					y_axis,
				},
				{ where: { id } }
			).then(() => {
				res.status(200).send("note updated");
			});
		} catch (err) {
			res.send({ error: err });
		}
	}
};

deleteNote = (req, res) => {
	if (Auth(req).auth) {
		const id = req.params.id;
		try {
			Note.destroy({ where: { id } }).then(() => {
				res.status(200).json({ message: `note ${id} destroyed` });
			});
		} catch (err) {
			res.send({ error: err });
		}
	} else {
		res.send(Auth(req));
	}
};

module.exports = {
	getNotes,
	// getUserNotes,
	postNewNote,
	getNote,
	putNote,
	deleteNote,
};
