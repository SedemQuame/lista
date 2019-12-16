// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
const NewsApi = require('newsapi');

// adding api key to create new newsapi instance.
const newsapi = new NewsApi(process.env.NEWS_API);

// declaring variables to hold (headline or everything source) response.
let headline_response = '';
let everything_response = '';

exports.headlines = (req, res) => {
    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        q: 'tech',
        // category: 'sports',
        language: 'en'
            // country: 'us'
    }).then(response => {
        console.log(response);
        if (response.status == 'ok') {
            // redirecting to news template, and passing articles.
            res.render(__dirname + './../public/views/news/news.views.ejs', { articles: response.articles });
            // res.send(response.articles);
        }
    });
};

exports.everything = (req, res) => {
    // To query /v2/everything
    // You must include at least one q, source, or domain
    newsapi.v2.everything({
        q: 'sports',
        sources: 'bbc-news,the-verge',
        // domains: 'bbc.co.uk, techcrunch.com',
        // from: '2017-12-01',
        // to: '2017-12-12',
        language: 'en',
        // sortBy: 'relevancy',
        page: 1
    }).then(response => {
        if (response.status == 'ok') {
            // redirecting to news template, and passing articles.
            res.render(__dirname + './../public/views/news/news.views.ejs', { articles: response.articles });
        }
    });
    // // To query sources
    // // All options are optional
    // newsapi.v2.sources({
    //     category: 'technology',
    //     language: 'en',
    //     country: 'us'
    // }).then(response => {
    //     console.log(response);

    // });
};