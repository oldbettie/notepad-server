const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const routes = require("./routes/routes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

routes(app);

// test post works maybe?
app.post("/notes", (req, res) => {
	const inData = [2, 2, "test", "2022-05-21 03:14:00", 1200, 1200]; //normally req.body
	query.postNote(inData).then((notes) => {
		console.log("in database");
	});
});

app.listen(PORT);

app.use((req, res) => {
	res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`server running on http://localhost:${PORT}`);
