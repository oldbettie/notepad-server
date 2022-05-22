const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes/routes');

const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//load routes
app.use(routes);


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.use((req, res) => {
    res.status(404).send({ url: `${ req.originalURL } not found`});
});