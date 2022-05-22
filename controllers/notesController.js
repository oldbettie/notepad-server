//All notes controllers

getNewNote = (req, res) => {
    res.send('create new note')
}

postNewNote = (req, res) => {
    res.send('post new note');
    //no redirect
}

getNote = (req, res) => {
    res.send(`get note with id`);
}

putNote = (req, res) => {
    res.send(`update note. edit note form`);
}

deleteNote = (req, res) => {
    res.send(`delete subject with id`);
    // no redirect;
}

module.exports = {
    getNewNote,
    postNewNote,
    getNote,
    putNote,
    deleteNote
}