//All subjects controllers
const { db } = require("../models");
const Subject = db.models.Subject;
const SubjectUser = db.models.SubjectUser;

getAllSubjectsForUser = (req, res) => {
    //get user from active user
    const ownerId = 1; //for testing purposes
	try {
		Subject.findAll( {
            where: { ownerId }
        })
		.then(subjects => {
			res.status(200).json(subjects);
		})
	} catch (err) {
		res.send({ error: err });
	}
} // works don't fuck with it

postNewSubject = (req, res) => {
    const ownerId = 1; //get session user id
	const { title } = req.body
	try {
		Subject.create({
			title,
			ownerId
	}).then(() => {
		res.status(200).json({msg:`subject ${ title } created`});
	})} catch (err) {
		res.send({error: err});
	}
} //works don't fuck with it

getSubject = (req, res) => {
    const id = req.params.id //subject_id
	try {
		Subject.findAll({
			where: { id },
            // include: [{ model: SubjectUser, as: 'participants',
            // attributes: [ subjectId ] }]
		})
		.then((subject) => {
			res.status(200).json(subject);
		})
	} catch(err) {
		res.send({ error: err });
	}
} //works. needs to return participants

putSubject = (req, res) => {
    //advanced query
    res.send(`update subject. populated subject form`);
}

deleteSubject = (req, res) => {
    const id = req.params.id;
	try {
	Subject.destroy(
		{where: { id }}
	).then(() => {
		res.status(200).json({msg:`subject ${id} destroyed`});
	})
	} catch (err) {
		res.send({ error });
	}
} // works. you know the drill...

module.exports = {
    getAllSubjectsForUser,
    postNewSubject,
    getSubject,
    putSubject,
    deleteSubject
}