// jshint esversion: 6
require('dotenv').config();

// requiring modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const db = require('./config/database.config');

//requesting random image and downloading it.
request('https://source.unsplash.com/1600x700/?abstract,space').pipe(fs.createWriteStream('public/assets/doodle.png'));

// creating mongoose connection to db
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });

//creating app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// serving static files in express
app.use(express.static('public'));

//====================================== requiring list routes ========================================//
require('./routes/list.routes')(app);
require('./routes/weather.routes')(app);
require('./routes/anime.routes')(app);
require('./routes/news.routes')(app);


// define a simple route
app.get('/', (req, res) => {
    // uncomment the line below to display results in postman.
    // res.json({ "message": "Welcome to lista application. Take notes quickly. Organize and keep track of all your todos." });
    res.redirect('/list');
});


// listening port
let port = 8080;
app.listen(port, function() {
    console.log(`app started on port: ${port}`);
});