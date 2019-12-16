// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// custom modules
const Anime = require('../models/anime_preferences.models');

//================================== creating HTTP handler methods ==================================//
// get information on fav anime titles.
exports.retrieveRandomAnime = (req, res) => {};

// get information on fav anime categories.
exports.retrieveFavAnimeCategories = (req, res) => {};


// get random information
exports.retrieveRandomAnime = (req, res) => {};


// search specific anime title
exports.searchSpecificAnimeTitle = (req, res) => {};


// search specific anime category
exports.searchSpecificCategoryTitle = (req, res) => {};