//All subjects controllers
const { db } = require("../models");
const Subject = db.models.Subject;
const User = db.models.User;
const session = require("./sessionController");
const Auth = require("./auth");

getAllSubjectsForUser = (req, res) => {
<<<<<<< HEAD
	try {
		Subject.findAll({
			where: { ownerId: req.params.id },
		}).then((subjects) => {
			res.status(200).json(subjects);
		});
	} catch (err) {
		res.send({ error: err, message: "failed to get subjects please check error" });
	}
=======
	//get user from active user
	//const ownerId = 1; //for testing purposes
	const ownerId = req.params.id;
	console.log(ownerId);
		try {
			Subject.findAll({
				where: { ownerId },
			}).then((subjects) => {
				res.status(200).json(subjects);
			});
		} catch (err) {
			res.send({ error: err });
		}
>>>>>>> 8f6b2909721648731ffcb1805e6c5b5e0480f598
};

postNewSubject = (req, res) => {
	if (Auth(req).auth) {
		const { title } = req.body;
		try {
			Subject.create({
				title,
				ownerId: req.body.ownerId,
			}).then(() => {
				res.status(200).json({ message: `subject ${title} created` });
			});
		} catch (err) {
			res.send({ error: err });
		}
	} else {
		res.send(Auth(req));
	}
};

getSubject = (req, res) => {
	const id = req.params.id; //subject_id
	try {
		Subject.findAll({
			where: { id },
			include: [{ model: User}]
		}).then((subject) => {
			res.status(200).json(subject);
		});
	} catch (err) {
		res.send({ error: err });
	}
};

putSubject = (req, res) => {
	if (Auth(req).auth) {
		try {
			Subject.update(
				{ title: req.body.title },
				{ where: { id: req.params.id } }
			).then((id) => res.send({ message: `updates subject with id ${id}` }));
		} catch (err) {
			res.send({ error: err });
		}
	} else {
		res.send(Auth(req));
	}
};

deleteSubject = (req, res) => {
	const id = req.params.id;
	try {
		Subject.destroy({ where: { id } }).then(() => {
			res.status(200).json({ message: `subject ${id} destroyed` });
		});
	} catch (err) {
		res.send({ error: err });
	}
};

module.exports = {
	getAllSubjectsForUser,
	postNewSubject,
	getSubject,
	putSubject,
	deleteSubject,
};
