const env = process.env;
//db config
const config = {
	dbConfig: {
		host: env.DB_HOST || "localhost",
		user: env.DB_SER || "root",
		password: env.DB_PASS || "@1T2e3a4m",
		database: env.DB_DATABASE || "notepad_db",
		dialect: "mysql",
	},
};

module.exports = config;
