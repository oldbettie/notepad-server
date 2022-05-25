//All notes controllers
//const db = require("../db/query");
const { db } = require("../models");
const Note = db.models.Note;

postNewNote = (req, res) => {
	// if(Auth(req).auth)
	//get location from front-end
	//requires elem.getBoundingClient() result from client to change location
	const userId = 1; //get session user id
	const { note_text, x_axis, y_axis, subjectId } = req.body;
	try {
		Note.create({
			note_text,
			x_axis,
			y_axis,
			subjectId,
			userId: userId,
		}).then(() => {
			res.status(200).json({ message: "note created" });
		});
	} catch (err) {
		res.send({ error: err });
	}
}; // work dont fuck with it

getNote = (req, res) => {
	const id = req.params.id; //note_id
	try {
		Note.findAll({
			where: { id },
		}).then((note) => {
			res.status(200).json(note);
		});
	} catch (err) {
		res.send({ error: err });
	}
}; //works dont fuck with it

getNotes = (req, res) => {
	try {
		Note.findAll().then((notes) => {
			res.status(200).json(notes);
		});
	} catch (err) {
		res.send({ error: err });
	}
}; // works dont fuck with it

putNote = (req, res) => {
	//requires elem.getBoundingClient() result from client to change location
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
};

deleteNote = (req, res) => {
	const id = req.params.id;
	//console.log(req.params.id);
	try {
		Note.destroy({ where: { id } }).then(() => {
			res.status(200).json({ message: `note ${id} destroyed` });
		});
	} catch (err) {
		res.send({ error: err });
	}
	// no redirect;
}; // works. dont fuck with it

module.exports = {
	getNotes,
	postNewNote,
	getNote,
	putNote,
	deleteNote,
};
