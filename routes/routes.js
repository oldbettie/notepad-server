const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");
const sessions = require("../controllers/sessionController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");

// not sure where this function needs to be

router.route("/isAuth").post(sessions.getUser);

//users
router.route("/login").post(sessions.createSession);

// signup/userprofile
router.route("/signup").post(users.registerNewUser);

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

router.get("/notes", notes.getNotes);

router.route("/notes/new").post(notes.postNewNote);

router
	.route("/notes/:id")
	.get(notes.getNote)
	.put(notes.putNote)
	.delete(notes.deleteNote);

module.exports = router;
