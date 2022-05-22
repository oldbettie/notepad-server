const express = require('express');
const { route } = require('express/lib/application');
const { get } = require('express/lib/response');
const router = express.Router();

//Landing page
router.get('/', (req, res) => {
    res.send('landing page');
});

// //////////////////
//users
router
    .route('/users/new')
    .get((req, res) => {
        res.send('user form')
    })
    .post((req, res) => {
        res.send('post form')
        //redirect to user profile
    });

router
    .route("/users/:id")
    .get((req, res) => {
        res.send(`get user with id`);
    })
    .put((req, res) => {
        res.send(`update user. populated user form`);
    })
    .delete((req, res) => {
        res.send(`delete user with id`);
        //redirect to landing?;
    });

// //////////////subject routes //////////////

router.get("/subjects", (req, res) => {
    res.send('not sure if needed. see all subjects for user_id=x? for admin?');
});

router
    .route("/subjects/new")
    .get((req, res) => {
        res.send('create new subject');
        //inside user main
    })
    .post((req, res) => {
        res.send('post new subject');
        //no redirect
    })

router
    .route("/subjects/:id")
    .get((req, res) => {
        res.send(`get subject with id//show notes`);
    })
    .put((req, res) => {
        res.send(`update subject. populated subject form`);
    })
    .delete((req, res) => {
        res.send(`delete subject with id`);
        //redirect to user profile?;
    });


/////////////////notes routes /////////////

router
    .route("/notes/new")
    .get((req, res) => {
    res.send('create new note')
    })
    .post((req, res) => {
        res.send('post new note');
        //no redirect
    })
router  
    .route("/notes/:id")
    .get((req, res) => {
        res.send(`get note with id`);
    })
    .put((req, res) => {
        res.send(`update note. edit note form`);
    })
    .delete((req, res) => {
        res.send(`delete subject with id`);
        // no redirect;
    });

module.exports = router