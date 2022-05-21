const query = require("../db/query")


exports.getAllNotes = (req, res) => {
    query.getNotes().then(notes => {
        console.log(notes);
        res.send('ok');
    })
}
