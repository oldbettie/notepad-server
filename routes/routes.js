const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");
const sessions = require("../controllers/sessionController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");

//Landing page
router.get("/getnotes", notes.getNotes);

// not sure where this function needs to be

router.route("/isAuth").get(sessions.checkSessionStatus);

//users
router.route("/login").post(sessions.createSession).get(sessions.getUser);

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

router.route("/notes/new").get(notes.getNewNote).post(notes.postNewNote);

router
	.route("/notes/:id")
	.get(notes.getNote)
	.put(notes.putNote)
	.delete(notes.deleteNote);

module.exports = router;
