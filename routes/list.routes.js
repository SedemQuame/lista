// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const list = require('../controllers/list.controller');

    //========================================== app list routes ============================================//
    app.route('/list')
        // returns all the list items.
        .get(list.findAll) //working
        // delete all the list items
        .delete(list.deleteAll); //working

    // creating new list items with params
    app.post('/list/:item.:description.:deadline', list.create); //working

    // return list item given an itemId
    app.get('/list/:itemId', list.findOne); //working


    // delete list item given an itemId
    app.delete('/list/:itemId', list.deleteOne); //working


    //========================================== app create routes ==========================================//
    app.route('/create')
        // displays the create view
        .get((req, res) => {
            res.render(__dirname + './../public/views/createlist.views.ejs');
        })
        // creates a new list item.
        .post(list.create); //working


    //========================================== app update routes ==========================================//
    app.route('/update')
        .get((req, res) => {
            res.render(__dirname + './../public/views/createlist.views.ejs', {});
        })
        // update list item given an itemId
        .put(list.updateOne); //working

};