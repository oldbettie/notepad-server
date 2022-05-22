const db = require("./connection");

async function getNotes() {
    try {
        const result = await db.query(
            `SELECT * FROM notes`, []
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

async function postNote(inData) {
    try {
        await db.query(
            `INSERT INTO notes (user_id, subject_id, text, timestamp, x-axis, y-axis) VALUES (?,?,?,?,?,?)`, inData
        )
    } catch (err) {
        console.error(err);
    }
}



module.exports = {
    getNotes,
    postNote
}