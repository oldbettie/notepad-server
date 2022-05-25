const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");
const sessions = require("../controllers/sessionController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");

// this is for the auth on the front end for setting userContext
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
router.get("/subjects/:id", subjects.getAllSubjectsForUser); //tested on front end

router.post("subjects/:id/new", subjects.postNewSubject); //not tested

router
	.route("/subject/:id")
	.get(subjects.getSubject) // not tested. needs participants added
	.put(subjects.putSubject) //for later
	.delete(subjects.deleteSubject); //  not tested

//notes routes

router.get("/notes", notes.getNotes); //not tested

router.route("/notes/new").post(notes.postNewNote); //not tested

router
	.route("/notes/:id")
	.get(notes.getNote) //not tested
	.put(notes.putNote) //not tested
	.delete(notes.deleteNote); //not tested

module.exports = router;
