const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");
const sessions = require("../controllers/sessionController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");

// not sure where this function needs to be

router.route("/isAuth").post(sessions.getUser);

//users
router.route("/login").post(sessions.createSession); // tested

// signup/userprofile
router.route("/signup").post(users.registerNewUser); // tested

router
	.route("/users/:id")
	.get(users.getUser) // tested
	.put(users.putUser) // tested
	.delete(users.deleteUser);

//subject routes

//route should be part of users/:?/subjects  ?
router.get("/subjects", subjects.getAllSubjectsForUser); //tested

router.route("/subjects/new").post(subjects.postNewSubject); //tested

router
	.route("/subjects/:id")
	.get(subjects.getSubject) //tested. needs participants added
	.put(subjects.putSubject) //for later
	.delete(subjects.deleteSubject); // tested

//notes routes

router.get("/notes", notes.getNotes); //tested

router.route("/notes/new").post(notes.postNewNote); //tested

router
	.route("/notes/:id")
	.get(notes.getNote) //tested
	.put(notes.putNote) //tested
	.delete(notes.deleteNote); //tested

module.exports = router;
