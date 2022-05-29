module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		userName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		color: DataTypes.STRING,
	});

	return User;
};
