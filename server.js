// jshint esversion: 6

// requiring modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/database.config');

//creating app
const app = express();

// creating mongoose connection to db
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// serving static files in express
app.use(express.static('public'));

// define a simple route
app.get('/', (req, res) => {
    res.redirect('/list');
    // uncomment the line below to display results in postman.
    // res.json({ "message": "Welcome to lista application. Take notes quickly. Organize and keep track of all your todos." });
});

//====================================== requiring list routes ========================================//
require('./routes/list.routes')(app);

// listening port
let port = 8080;
app.listen(port, function() {
    console.log(`app started on port: ${port}`);
});