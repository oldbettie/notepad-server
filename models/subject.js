module.exports = (sequelize, DataTypes) => {
	const Subject = sequelize.define("subject", {
		title: DataTypes.STRING,
		//ownerId: DataTypes.INTEGER
	});

	return Subject;
};
