module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define("note", {
		note_text: DataTypes.STRING,
		x_axis: DataTypes.INTEGER,
		y_axis: DataTypes.INTEGER,
		color: DataTypes.STRING,
	});

	return Note;
};
