//All notes controllers
const db = require("../db/query");

getNewNote = (req, res) => {
	res.send("create new note");
};

postNewNote = (req, res) => {
	res.send("post new note");
	//no redirect
};

getNote = (req, res) => {
	res.send(`get note with id`);
};

getNotes = (req, res) => {
	db.getNotes().then(notes => {
		console.log("notes");
		res.send(notes);
	})
	//res.send(`get note with id`);
};

putNote = (req, res) => {
	res.send(`update note. edit note form`);
};

deleteNote = (req, res) => {
	res.send(`delete subject with id`);
	// no redirect;
};

module.exports = {
	getNewNote,
	postNewNote,
	getNote,
	getNotes,
	putNote,
	deleteNote,
};
