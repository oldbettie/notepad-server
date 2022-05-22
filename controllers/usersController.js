//All user Controllers

getNewUser = (req, res) => {
    res.send('user form')
}

postNewUser = (req, res) => {
    res.send('post form')
    //redirect to user profile
}

getUser = (req, res) => {
    res.send(`get user with id`);
}

putUser = (req, res) => {
    res.send(`update user. populated user form`);
}

deleteUser = (req, res) => {
    res.send(`delete user with id`);
    //redirect to landing?;
}

module.exports = {
    getNewUser,
    postNewUser,
    getUser,
    putUser,
    deleteUser
}