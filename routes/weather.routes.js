// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const weather = require('../controllers/weather.controller');

    //========================================== app weather routes ============================================//
    app.route('/weather')
        // returns stored weather information
        .get(weather.retrieve);
};