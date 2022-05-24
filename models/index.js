const { Sequelize } = require("sequelize");
const { dbConfig } = require("../db/config_db");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
	}
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./user")(sequelize, Sequelize.DataTypes);
db.models.Note = require("./note")(sequelize, Sequelize.DataTypes);
db.models.subjects = require("./subject")(sequelize, Sequelize.DataTypes);

db.models.User.belongsToMany(db.models.Note, { through: db.models.Subject });
db.models.Note.belongsTo(db.models.User, { through: db.models.Subject });

module.exports = {
	db,
};
