// jshint esversion:6
//====================================== requiring modules ===========================================//
const List = require('../models/list.models');

//================================== creating HTTP handler methods ==================================//

// create and save new list item
exports.create = (req, res) => {
    const itemTitle = req.params.item || 'Untitled';
    const description = req.params.description || 'No description';
    const deadline = req.params.deadline || '25-12-2019';

    List.create({ item: itemTitle, description: description, deadline: deadline }).then(list => {
        res.send({ msg: 'doc creation successful' });
    }).catch(err => {
        res.send({ msg: 'doc creation failed' });
    });
};

// return all db list items
exports.findAll = (req, res) => {
    List.find({}).
    then(list => {
        console.log(list);

        res.send(list);
    }).
    catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving list."
        });
    });
};

// return a db list items
exports.findOne = (req, res) => {
    List.findById(req.params.itemId).
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
    // // Validate Request
    // if (!req.params.content) {
    //     return res.status(400).send({
    //         message: "List content can not be empty"
    //     });
    // }

    List.findByIdAndUpdate(req.params.itemId, {
            item: req.params.itemTitle || "Untitled Note",
            description: req.params.itemDescription || "No description"
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
    List.findByIdAndRemove(req.params.itemId)
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