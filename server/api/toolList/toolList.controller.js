'use strict';

var _ = require('lodash');
var User = require('../user/user.model');
var ToolList = require('./toolList.model');

// Get list of toolLists
exports.index = function(req, res) {
  ToolList.find(function (err, toolLists) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(toolLists);
  });
};

// Get a single toolList
exports.show = function(req, res) {
  ToolList.findById(req.params.id, function (err, toolList) {
    if(err) { return handleError(res, err); }
    if(!toolList) { return res.status(404).send('Not Found'); }
    return res.json(toolList);
  });
};

// Creates a new toolList in the DB.
exports.create = function(req, res) {
  // Create the toolList in the toolList DB
  ToolList.create(req.body, function(err, toolList) {
    if(err) { return handleError(res, err); }

    // Save the toolList Object to the user
    User.findById(req.body.userID, function(err, user) {
      user.toolLists.push(toolList);
      user.save(function(err){
        if(err) { return handleError(res, err); }
      });
    });

    return res.status(201).json(toolList);
  });
};

// Updates an existing toolList in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ToolList.findById(req.params.id, function (err, toolList) {
    if (err) { return handleError(res, err); }
    if(!toolList) { return res.status(404).send('Not Found'); }
    var updated = _.merge(toolList, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(toolList);
    });
  });
};

// Deletes a toolList from the DB.
exports.destroy = function(req, res) {
  ToolList.findById(req.params.id, function (err, toolList) {
    if(err) { return handleError(res, err); }
    if(!toolList) { return res.status(404).send('Not Found'); }
    toolList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}