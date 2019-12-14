//jshint esversion:6
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const weatherSchema = mongoose.Schema({
    timezone: String,
    summary: String,
    icon: String,
    temperature: Number,
    humidity: Number,
    pressure: Number,
    visibility: Number,
    flag: Boolean
});

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('weather', weatherSchema);