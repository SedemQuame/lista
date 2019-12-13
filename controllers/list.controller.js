// jshint esversion:6
//====================================== requiring modules ===========================================//
const List = require('../models/list.models');

//================================== creating HTTP handler methods ==================================//

// create and save new list item
exports.create = (req, res) => {

    const itemTitle = req.body.item || 'Untitled';
    const description = req.body.description || 'No description';
    const deadline = req.body.deadline || '25-12-2019';

    List.create({ item: itemTitle, description: description, deadline: deadline }).then(list => {
        res.redirect('/list');
    }).catch(err => {
        res.send({ msg: 'doc creation failed' });
    });
};

// return all db list items
exports.findAll = (req, res) => {
    List.find({}).
    then(list => {
        console.log(list);
        res.render(__dirname + './../public/views/list.views.ejs', { lists: list });
    }).
    catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving list."
        });
    });
};

// return a db list items
exports.findOne = (req, res) => {
    List.findById(req.body._id).
    then(listItem => {
        if (!listItem) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving a list item."
            });
        }
        res.send(listItem);
    }).
    catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.itemId
        });
    });
};

// update a db list items
exports.updateOne = (req, res) => {
    List.findByIdAndUpdate(req.body.item, {
            item: req.body.item || "Untitled Note",
            description: req.body.description || "No description",
            deadline: req.body.deadline || "No deadline"
        }, { new: true })
        .then(listItem => {
            if (!listItem) {
                return res.status(404).send({
                    message: "listItem not found with id " + req.params.itemId
                });
            }
            res.send(listItem);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "listItem not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error updating listItem with id " + req.params.itemId
            });
        });

};

// delete one db list items
exports.deleteOne = (req, res) => {
    List.findByIdAndRemove(req.body.itemId)
        .then(listItem => {
            if (!listItem) {
                return res.status(404).send({
                    message: "listItem not found with id " + req.params.itemId
                });
            }
            res.send({ message: "listItem deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "listItem not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Could not delete listItem with id " + req.params.itemId
            });
        });
};

// delete all db list items
exports.deleteAll = (req, res) => {
    List.deleteMany({})
        .then(listItems => {
            if (listItems.ok == 1) {
                res.send(listItems);
            } else {
                return res.status(404).send({
                    message: "ClistItems not found " + req.params.itemId
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete listItem with id " + req.params.itemId
            });
        });
};