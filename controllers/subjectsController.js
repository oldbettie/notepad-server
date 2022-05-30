//All subjects controllers
const { db } = require("../models");
const Subject = db.models.Subject;
const User = db.models.User;
const Auth = require("./auth");

getAllSubjectsForUser = (req, res) => {
	try {
		Subject.findAll({
			where: { ownerId: req.params.id },
		}).then((subjects) => {
			res.status(200).json(subjects);
		});
	} catch (err) {
		res.send({ error: err, message: "failed to get subjects please check error" });
	}
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
			include: [{ model: User }],
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

//new controllers
// gets all subjects returns with participants	tested
getAllSubjects = (req, res) => {
	console.log("query made");
	try {
		Subject.findAll({
			include: [{ model: User }],
		}).then((subjects) => {
			res.status(200).json(subjects);
		});
	} catch (err) {
		res.send({ error: err, message: "failed to get subjects please check error" });
	}
};

//Adds user to subject as a participant		tested
putUserToSubject = async (req, res) => {	
	try {
		let currentSubject = await Subject.findByPk(req.body.subjectId);
		console.log(currentSubject, 'check');
		currentSubject.addUsers(req.body.userId)
		res.send({ message: `added user to subject` });
	} catch (err) {
		res.send({ error: err });
	}
};

// deletes user participant from subject		tested
deleteUserFromSubject = async (req, res) => {
	const {userId, subjectId} = req.body;
	try {
		let currentSubject = await Subject.findByPk(subjectId);
		currentSubject.removeUser(userId)
		res.send({ message: `deleted user to subject` });
	} catch (err) {
		res.send({ error: err });
	}
}

// gets subject users for subjectId = :?		tested
getAllSubjectUsers = async (req, res) => {
	const subjectId = req.params.id;
	console.log(subjectId);
	try {
		let currentSubject = await Subject.findByPk(subjectId);
		let subUsers = await currentSubject.getUsers();
		res.send(subUsers);
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
	getAllSubjects,
	putUserToSubject,
	deleteUserFromSubject,
	getAllSubjectUsers,
};
