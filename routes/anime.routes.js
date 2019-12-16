// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const Anime = require('./../controllers/anime.controller');

    //========================================== app weather routes ============================================//
    app.route('/anime')
        // returns information on random anime titles
        .get((req, res) => {
            res.send({ 'NAME': 'SEDEM' });
        });
};