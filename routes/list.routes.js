// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const list = require('../controllers/list.controller');

    // app routes
    app.route('/list')
        // returns all the list items.
        .get(list.findAll) //working
        // creates a new list item.
        .post(list.create) //working
        // delete all the list items
        .delete(list.deleteAll); //working

    // creating new list items with params
    app.post('/list/:item.:description.:deadline', list.create); //working

    // return list item given an itemId
    app.get('/list/:itemId', list.findOne); //working

    // update list item given an itemId
    app.put('/list/:itemId.:itemTitle.:itemDescription', list.updateOne); //working

    // delete list item given an itemId
    app.delete('/list/:itemId', list.deleteOne); //working
};