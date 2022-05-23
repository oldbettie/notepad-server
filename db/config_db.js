const env = process.env;
//db config
const config = {
	db: {
		host: env.DB_HOST || "localhost",
		user: env.DB_SER || "root",
		password: env.DB_PASS || "@1T2e3a4m",
		database: env.DB_DATABASE || "notepad_db",
	},
};

module.exports = config;
