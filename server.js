const express = require("express");
const cors = require("cors");
const { db } = require("./models");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv").config();

// check for caps after git pull
const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: [`http://localhost:3001`],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// need to update these settings before it will work
app.use(
	session({
		key: "userId",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);
// auto invoked callback function..
(async () => {
	await db.sequelize.sync();
})();

//load routes
app.use(routes);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use((req, res) => {
	res.status(404).send({ url: `${req.originalURL} not found!` });
});

app.listen(PORT);
console.log(`server running on http://localhost:${PORT}`);
