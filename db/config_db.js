const env = process.env;
//db config
const config = {
	dbConfig: {
		host: process.env.HOST || "localhost",
		user: process.env.USER || "root",
		password: process.env.PASSWORD || "@1T2e3a4m",
		database: process.env.DB || "notepad_db",
		dialect: "mysql",
	},
};

module.exports = config;
