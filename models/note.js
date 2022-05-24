module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define("note", {
		note_Text: DataTypes.STRING,
		x_axis: DataTypes.INTEGER,
		y_axis: DataTypes.INTEGER,
	});

	return Note;
};
