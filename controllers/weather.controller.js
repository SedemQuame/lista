// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules
const DarkSky = require('dark-sky');
const mongoose = require('mongoose');

// custom modules
const weather = require('../models/weather.models');
const db = require('../config/database.config');

// creating mongoose connection to db
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });

// Dark Sky Api Configuration
const darksky = new DarkSky(process.env.DARK_SKY); // Your API KEY can be hardcoded, but I recommend setting it as an env variable.

// use
const position = {
    latitude: 24.269501,
    longitude: 3.762658
};


exports.retrieve = (req, res) => {
    darksky
        .latitude(position.latitude)
        .longitude(position.longitude)
        .language('en')
        .exclude('minutely,daily,hourly,flags')
        .extendHourly(true)
        .get()
        .then(info => {
            weather.find({ flag: true }, (err, docs) => {
                if (!docs.length) {
                    console.log('creating model');
                    weather.create({
                            timezone: info.timezone,
                            summary: info.currently.summary,
                            icon: info.currently.icon,
                            temperature: info.currently.temperature,
                            humidity: info.currently.humidity,
                            pressure: info.currently.pressure,
                            visibility: info.currently.visibility,
                            flag: true
                        }).then((weather) => {
                            res.send({ msg: 'Doc creation successful 😎😎😎' });
                        })
                        .catch((err) => {
                            res.send({ msg: 'Error occurred, when creating doc 😫😫😫' + err });
                        });
                } else {
                    console.log('update model');
                    weather.updateOne({ flag: true }, {
                            timezone: info.timezone,
                            summary: info.currently.summary,
                            icon: info.currently.icon,
                            temperature: info.currently.temperature,
                            humidity: info.currently.humidity,
                            pressure: info.currently.pressure,
                            visibility: info.currently.visibility,
                            flag: true
                        }).then((weather) => {
                            res.send({ msg: 'Doc update successful 😎😎😎' });
                        })
                        .catch((err) => {
                            res.send({ msg: 'Error occurred, when update doc 😫😫😫' + err });
                        });
                }
            });
        })
        .catch(err => console.log(err));
};