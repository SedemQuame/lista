// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const news = require('../controllers/news.controller');

    //========================================== app list routes ============================================//
    app.route('/news_headlines')
        // return all news headlines
        .get(news.headlines);

    app.route('/everything_news')
        // return all news headlines
        .get(news.everything);
};