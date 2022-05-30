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
router
	.route("/subjects/all")
	.get(subjects.getAllSubjects);	//tested
//new subject routes ------------


router
	.route("/subjects/addUser")
	.post(subjects.putUserToSubject); //Tested w/ postman. no auth yet
router
	.route("/subjects/removeUser")
	.post(subjects.deleteUserFromSubject); //Tested w/ postman. no auth yet

router.get("/subject/users/:id", subjects.getAllSubjectUsers) //tested w/ postman

// end of new routes ------------

router.get("/subjects/:id", subjects.getAllSubjectsForUser); //tested

router.post("/subjects/:id/new", subjects.postNewSubject); // testsed

router
	.route("/subject/:id")
	.get(subjects.getSubject) // tested
	.put(subjects.putSubject) //tested
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
