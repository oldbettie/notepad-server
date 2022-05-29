// db config

// const config = {
// 	dbConfig: {
// 		host: process.env.HOST || "localhost",
// 		user: process.env.USER || "root",
// 		password: process.env.PASSWORD || "@1T2e3a4m",
// 		database: process.env.DB || "notepad_db",
// 		dialect: "mysql",
// 	},
// };

//  for local only comment this and uncomment above for all git pushed
const config = {
	dbConfig: {
		host: "localhost",
		user: "root",
		password: "@1T2e3a4m",
		database: "notepad_db",
		dialect: "mysql",
	},
};

module.exports = config;
