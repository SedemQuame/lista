// jshint esversion: 6

//==============================requiring modules && creating express app==============================//
const express = require('express');
const bodyParser = require('body-parser');

//creating express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//=======================================configuring database==========================================//
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true }).
then(() => {
    console.log('database connection successful.');
}).catch((err) => {
    console.log(`database connection failed. exiting now ...${err}`);
    process.exit();
});

//===================================requiring custom user models======================================//
const Todo = require('./models/todo.js');



// creating mongoose connection to db
mongoose.connect('mongodb://localhost/lista', { useUnifiedTopology: true, useNewUrlParser: true });


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to lista application. Take notes quickly. Organize and keep track of all your todos." });
});



// listening port
let port = 8080;
app.listen(port, function() {
    console.log(`app started on port: ${port}`);
});