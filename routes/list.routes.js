// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const list = require('../controllers/list.controller');

    // app routes
    app.route('/list')
        // returns all the list items.
        .get(list.findAll)
        // creates a new list item.
        .post(list.create)
        // delete all the list items
        .delete(list.deleteAll);

    // creating new list items with params
    app.post('/list/:item.:description.:deadline', list.create);

    // return list item given an itemId
    app.get('/list/:id', list.findOne);

    // update list item given an itemId
    app.put('/list/:id', list.updateOne);

    // delete list item given an itemId
    app.delete('/list/:id', list.deleteOne);
};