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
router.get("/subjects/:id", subjects.getAllSubjectsForUser); //tested

router.post("/subjects/:id/new", subjects.postNewSubject); // testsed

router
	.route("/subject/:id")
<<<<<<< HEAD
	.get(subjects.getSubject) // tested
	.put(subjects.putSubject) //tested
=======
	.get(subjects.getSubject) // tested on postman
	.put(subjects.putSubject) //for later
>>>>>>> 8f6b2909721648731ffcb1805e6c5b5e0480f598
	.delete(subjects.deleteSubject); // tested

//notes routes

router.route("/notes/:id").get(notes.getNotes); // tested

router.route("/notes/new").post(notes.postNewNote); // tested

router
	.route("/note/:id")
	// .get(notes.getNote) //not tested
	.put(notes.putNote) //not tested
	.delete(notes.deleteNote); // tested

module.exports = router;
