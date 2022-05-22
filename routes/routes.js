const express = require("express");
const { route } = require("express/lib/application");
const { get } = require("express/lib/response");
const router = express.Router();
const users = require("../controllers/usersController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");

//Landing page
router.get("/", (req, res) => {
	res.send("landing page");
});

//users

// login
router
	.route("/users/new")
	.get(users.getNewUser)
	.post(users.postNewUser)
	.delete();

// sign up
router
	.route("/users/:id")
	.get(users.getUser)
	.put(users.putUser)
	.delete(users.deleteUser);

//subject routes

router.get("/subjects", subjects.getAllSubjects);

router
	.route("/subjects/new")
	.get(subjects.getNewSubject)
	.post(subjects.postNewSubject);

router
	.route("/subjects/:id")
	.get(subjects.getSubject)
	.put(subjects.putSubject)
	.delete(subjects.deleteSubject);

//notes routes

router.route("/notes/new").get(notes.getNewNote).post(notes.postNewNote);

router
	.route("/notes/:id")
	.get(notes.getNote)
	.put(notes.putNote)
	.delete(notes.deleteNote);

module.exports = router;
