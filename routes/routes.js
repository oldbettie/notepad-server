const requests = require("../controllers/notesController.js");

module.exports = (app) => {
	app.route("/").get();

	// session???
	app.route("/login").get().post().delete();

	app.route("/signup").get().post();

	app.route("/users/:id").get().put().delete();

	app.route("/subjects").get();

	app.route("/subjects/:id").get().post().put().delete();

	// generated within subjects.
	app.route("/notes").get(requests.getAllNotes).put().delete();

	app.route("/notes/:id").get().post().put().delete();
};
