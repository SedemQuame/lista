// jshint esversion:6
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const newsSchema = mongoose.Schema({
    item: { type: String, default: 'Untitled list item' },
    description: { type: String },
    deadline: { type: String }
}, { timestamps: { createdAt: 'created_at' } });

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('new', newsSchema);