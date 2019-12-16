//jshint esversion:6
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const animeSchema = mongoose.Schema({
    favTitles: [String],
    favCategories: [String]
}, { timestamps: { createdAt: 'created_at' } });

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('anime', animeSchema);