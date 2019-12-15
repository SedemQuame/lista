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
    latitude: 16.518237,
    longitude: 20.270221
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
                    weather.create({
                            timezone: info.timezone,
                            summary: info.currently.summary,
                            icon: info.currently.icon,
                            temperature: info.currently.temperature,
                            humidity: info.currently.humidity,
                            pressure: info.currently.pressure,
                            visibility: info.currently.visibility,
                            flag: true
                        }).then((info) => {
                            res.render(__dirname + './../public/views/weather/weather.views.ejs', { weather: info });
                        })
                        .catch((err) => {
                            res.send({ msg: 'Error occurred, when creating doc 😫😫😫' + err });
                        });
                } else {
                    weather.updateOne({ flag: true }, {
                            timezone: info.timezone,
                            summary: info.currently.summary,
                            icon: info.currently.icon,
                            temperature: info.currently.temperature,
                            humidity: info.currently.humidity,
                            pressure: info.currently.pressure,
                            visibility: info.currently.visibility,
                            flag: true
                        }).then(() => {
                            // query bb, for information.
                            weather.find({ flag: true }, (err, info) => {
                                if (!err) {
                                    res.render(__dirname + './../public/views/weather/weather.views.ejs', { weather: info });
                                } else {
                                    res.send({ msg: 'Error occurred, when update doc 😫😫😫' + err });
                                }
                            });
                        })
                        .catch((err) => {
                            res.send({ msg: 'Error occurred, when update doc 😫😫😫' + err });
                        });
                }
            });
        })
        .catch(err => console.log(err));
};