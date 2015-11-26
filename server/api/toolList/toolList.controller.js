'use strict';

var _ = require('lodash');
var User = require('../user/user.model');
var Tool = require('../tool/tool.model');
var ToolList = require('./toolList.model');

// Get list of toolLists
exports.index = function(req, res) {
  ToolList.find(function (err, toolLists) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(toolLists);
  });
};

// Get a list of the featured toolLists 
exports.getFeatured = function(req, res) {
  ToolList.find({ 'featured' : true }, function(err, toolList) {
    if(err) { return handleError(res, err); }
    if(!toolList) { return res.status(404).send('No featured toolLists found'); }
    return res.json({featured: toolList});
  });
};

// Get a toolList(s)
exports.show = function(req, res) {
  var query = req.params.id.split(",");
  ToolList.find({ '_id': { $in: query } }, function(err, toolList) {
    if(!toolList) { return res.status(404).send('Not Found'); }
    if(err) { return handleError(res, err); }
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

// Adds a tool to the tool list
exports.update = function(req, res) {
  Tool.findById(req.body.toolID, function(err, tool) {
    if(err) { return handleError(res, err); }
    if(!tool) { return res.status(404).send('Tool to add Not Found'); }

    ToolList.findById(req.body.id, function(err, toolList) {
      if(req.body.addTool) {
        // If exists, return error
        for (var i = 0; i < toolList.tools.length; i++) {
          if (toolList.tools[i]._id.toString() === tool._id.toString()) {
            return res.status(409).send({ error: 'Tool already exists in this custom list' });
          }
        }
        toolList.tools.push(tool);
      } else if(!req.body.addTool) {
        for (var i= 0; i < toolList.tools.length; i++) {
          if (toolList.tools[i]._id.toString() === tool._id.toString()) {
            toolList.tools.splice(i, 1);
            break;
          }
        }
      }

      toolList.save(function(err) {
        if(err) { return handleError(res, err) }
        return res.status(201).json(toolList);
      });
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