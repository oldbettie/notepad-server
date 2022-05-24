//All notes controllers
//const db = require("../db/query");
const { db } = require("../models");
const Note = db.models.Note;

postNewNote = (req, res) => {
	//get location from front-end
	//const userId = 1; //get session user id
	//const { note_text, x_axis, y_axis, subjectId } = req.body
	console.log(req.body)
	try {
		Note.create({
			note_text: req.body.note_text,
			x_axis: req.body.x_axis,
			y_axis: req.body.y_axis,
			subjectId: req.body.subjectId,
			userId: req.body.userId
	}).then(() => {
		res.status(200).json('note created');
	})} catch (err) {
		res.send({error: err});
	}
};

getNote = (req, res) => {
	/const id = req.params.id //note_id
	try {
		Note.findAll({
			where: { id },
		})
		.then((note) => {
			res.status(200).json(note);
		})
	} catch(err) {
		res.send({ error: err });
	}
};

getNotes = (req, res) => {
	try {
		Note.findAll()
		.then(notes => {
			console.log("notes");
			res.status(200).json(notes);
		})
	} catch (err) {
		res.send({ error: err });
	}
	//res.send(`get note with id`);
};

putNote = (req, res) => {
	//requires elem.getBoundingClient() result from client to change location
	const note = req.params //note current values
	try {
		Note.update(
			{ 
				note_text: note.note_text,
				x_axis: note.x_axis,
				y_axis: note.y_axis
			},
			{	where : { id: note.id }}
		).then(() => {
			res.status(200).send('note updated');
		})
	} catch (err) {
		res.send({ error });
	}

};

deleteNote = (req, res) => {
	const id = params.id //note_id
	try {
	Note.destroy({
		where: { id }	
	}).then(() => {
		res.status(200).send('note destroyed');
	})
	} catch (err) {
		res.send({ error });
	}
	//clear note from display?
	//res.send(`delete subject with id`);
	// no redirect;
};

module.exports = {
	getNotes,
	postNewNote,
	getNote,
	putNote,
	deleteNote,
};
