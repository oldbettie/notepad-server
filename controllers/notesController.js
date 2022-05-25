//All notes controllers
//const db = require("../db/query");
const { db } = require("../models");
const Note = db.models.Note;
const session = require("./sessionController");

postNewNote = (req, res) => {
	//get location from front-end
	//requires elem.getBoundingClient() result from client to change location
	const userId = 1; //get session user id
	session.getUser().then(({id}) => {
		const { note_text, x_axis, y_axis, subjectId } = req.body;
		try {
			Note.create({
				note_text,
				x_axis,
				y_axis,
				subjectId,
				userId: id,
			}).then(() => {
				res.status(200).json({ message: "note created" });
			});
		} catch (err) {
			res.send({ error: err });
		}
	});
};

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

getNotes = (req, res) => {
	if (Auth(req).auth) {
		try {
			Note.findAll().then((notes) => {
				res.status(200).json(notes);
			});
		} catch (err) {
			res.send({ error: err });
		}
	}
};

getUserNotes = (req, res) => {
	session.getUser().then(({id}) => {
		try {
			Note.findAll({
				where: { id },
			}).then((notes) => {
				res.status(200).json(notes);
			});
		} catch (err) {
			res.send({ error: err });
		}
	})
};

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
	}
}; 

module.exports = {
	getNotes,
	getUserNotes,
	postNewNote,
	getNote,
	putNote,
	deleteNote,
};
