//All subjects controllers

getAllSubjects = (req, res) => {
    res.send('not sure if needed. see all subjects for user_id=x? for admin?');
}

getAllSubject = (req, res) => {
	try {
		Subjects.findAll()
		.then(subjects => {
			res.status(200).json(subjects);
		})
	} catch (err) {
		res.send({ error: err });
	}
};

getNewSubject = (req, res) => {
    res.send('create new subject');
    //inside user main
}

postNewSubject = (req, res) => {
    res.send('post new subject');
    //no redirect
}

getSubject = (req, res) => {
    res.send(`get subject with id//show notes`);
}

putSubject = (req, res) => {
    res.send(`update subject. populated subject form`);
}

deleteSubject = (req, res) => {
    res.send(`delete subject with id`);
    //redirect to user profile?;
}

module.exports = {
    getAllSubjects,
    getNewSubject,
    postNewSubject,
    getSubject,
    putSubject,
    deleteSubject
}