module.exports = (sequelize, DataTypes) => {
	const Subject = sequelize.define("subject", {
		//id: {type: DataTypes.STRING, primaryKey: true},
		title: DataTypes.STRING,
		//ownerId: DataTypes.INTEGER
	});

	return Subject;
};
