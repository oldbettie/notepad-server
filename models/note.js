module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define("note", {
		// id : {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
		// 	primaryKey: true
		// },
		note_text: DataTypes.STRING,
		x_axis: DataTypes.INTEGER,
		y_axis: DataTypes.INTEGER,
	});

	return Note;
};
