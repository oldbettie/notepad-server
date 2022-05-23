const express = require("express");
const { route } = require("express/lib/application");
const { get } = require("express/lib/response");
const router = express.Router();
const users = require("../controllers/usersController");
const sessions = require("../controllers/sessionController");
const subjects = require("../controllers/subjectsController");
const notes = require("../controllers/notesController");
const { verify } = require("jsonwebtoken");

//Landing page
router.get("/", (req, res) => {
	res.send("landing page");
});

const verifyJWT = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		res.send("yo we need a token");
	} else {
		verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.json({ auth: false, message: "failed to authenticate" });
			} else {
				req.userId = decoded.userId;
				next();
			}
		});
	}
};

router.route("/isAuth").get(sessions.checkSessionStatus, verifyJWT);

//users
router.route("/login").post(sessions.createSession).get(sessions.getUser);

// signup/userprofile
router
	.route("/users/new")
	// .get(users.getNewUser) // this would be only required on frntend
	.post(users.registerNewUser);
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
