//All notes controllers
const { db } = require("../models");
const Note = db.models.Note;
const User = db.models.User;
const Auth = require("./auth");

postNewNote = (req, res) => {
	if (Auth(req).auth) {
		const { note_text, x_axis, y_axis, subjectId, userId } = req.body;
		try {
			Note.create({
				note_text,
				x_axis,
				y_axis,
				subjectId,
				userId: userId,
				color: req.body.color,
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

putNote = (req, res) => {
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
	postNewNote,
	getNote,
	putNote,
	deleteNote,
};
