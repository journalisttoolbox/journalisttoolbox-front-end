'use strict';

var _ = require('lodash');
var Tool = require('./tool.model');

// Get list of tools
exports.index = function(req, res) {
  Tool.find({}, '-__v', function (err, tools) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tools);
  });
};

// Get a single tool
exports.show = function(req, res) {
  Tool.findById(req.params.id, function (err, tool) {
    if(err) { return handleError(res, err); }
    if(!tool) { return res.status(404).send('Not Found'); }
    return res.json(tool);
  });
};

//creating a new tool
exports.create = function(req,res) {

  var ArrayCategories = req.body.categories.split(",");
  ArrayCategories = ArrayCategories.map(function (val) { return val; });

  var ArrayOrganizations = req.body.companies.split(",");
  ArrayOrganizations = ArrayOrganizations.map(function (val) { return val; });
  
  var newTool = new Tool(req.body);

  newTool.companies = ArrayOrganizations;
  newTool.category  = ArrayCategories;
  newTool.upvotes  = [];
  newTool.downvotes  = [];
  newTool.owner = req.body.owner;
  newTool.platforms = [req.body.pc,req.body.mac,req.body.linux,req.body.web];

  // DATE
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth();
  var year = now.getFullYear();

  var fullDate = day+'/'+month+1+'/'+year;

  newTool.uploaded_date = fullDate;
    

  // Redundant platform urls to populate for now
  newTool.windows_url = '';
  newTool.mac_url = '';
  newTool.linux_url = '';

  newTool.save();

  //return all results including the new one.
  Tool.find(function(err, tools){
    if(err) res.send(err.message);
    res.json(tools);
  });
};

// Method for PUT requests
exports.put = function(req, res) {
  Tool.findOne({ '_id': req.params.id }, function(err, tool) {
    if(!tool) {
      // If tool is not found
      res.statusCode = 404;
      return res.send({ error: 'Not found' });
    }    
    if(err) {
      res.send(err.message);
    } else {

      // Update all fields
      for(var field in req.body) {
        tool[field] = req.body[field];
      }

      tool.save(function(err) {
        if(err) {
            console.log(err);
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', tool: tool });
        }
      });
    }
  });
};

// Deletes a tool(s) from the DB.
exports.destroy = function(req, res) {
  var query = req.params.id.split(",");
  var error = '';

  Tool.remove({ '_id': {$in: query }}, function(err, tools) {
    if(!tools) {
      res.statusCode = 404;
      error = 'Not Found';
      return res.send({ error: 'Not found' });
    }
    if(err) {
      res.statusCode = 500;
      error = err.data;
    } 
    else {
      res.statusCode = 200;
    }
    return res.send({ error: error });
  });
};

// listing all tools of a category
exports.category = function(req,res) {
  Tool.find({'categories': new RegExp('^'+req.params.name+'$', "i")}, function(err, tools) {
    if(err) res.send(err.message);
    res.json(tools);
  });
};

exports.getUsersTools = function(req, res, next) {
  var error = '';

  Tool.find({'owner': new RegExp('^'+req.params.email+'$', "i")}, function(err, tools) {
  if(err) { return handleError(res, err); }
    return res.status(200).json({ tools:tools });
  });
};

// Generic function to check if up or down votes exist already
exports.checkForVotes = function(tool, userID) {
  var existingVotes = {};

  // Check if user has upvoted before
  if (tool.upvotes.indexOf(userID) < 0) {
    existingVotes.upvotes = false;
  } else {
    existingVotes.upvotes = true;
  }

  // Check if user has downvoted before
  if(tool.downvotes.indexOf(userID) < 0) {
    existingVotes.downvotes = false;
  } else {
    existingVotes.downvotes = true;
  }

  return existingVotes;

};

exports.voteTool = function(req, res, next) {
  var error         = '';
  var toolToVote    = {};
  var existingVotes = {};
  var index;

  Tool.findById(req.params.id, function (err, tool) {
    if(err) { return handleError(res, err); }
    if(!tool) { return res.status(404).send('Not Found'); }
    toolToVote = tool;

    existingVotes = exports.checkForVotes(toolToVote, req.user._id);

    // Process the UPVOTE if the tool has been UPVOTED, see if it already exists
    if(req.body.vote) {
      console.log(existingVotes);

      // If upvoted but downvote is already present, remove the downvote
      if(existingVotes.downvotes) {
        index = toolToVote.downvotes.indexOf(req.user._id);
        toolToVote.downvotes.splice(index, 1);
      }

      // If there isn't already an upvote by this user, add an upvote
      if(!existingVotes.upvotes) 
        toolToVote.upvotes.push(req.user._id);

      // Save the tool
      toolToVote.save(function(err) {
        if(err) {
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', toolToVote: toolToVote });
        }
      });
    }

    // Process the DOWNVOTE if the tool has been DOWNVOTED, see if it already exists
    if(req.body.vote === false) {
      console.log('downvote pressed ', existingVotes);

      // If downvoted but upvote is already present, remove the upvote
      if(existingVotes.upvotes) {
        index = toolToVote.upvotes.indexOf(req.user._id);
        toolToVote.upvotes.splice(index, 1);
      }

      // If there isn't already an downvote by this user, add an downvote
      if(!existingVotes.downvotes) 
        toolToVote.downvotes.push(req.user._id);

      // Save the tool
      toolToVote.save(function(err) {
        if(err) {
          res.statusCode = 500;
          res.send({ error: 'Error with put request' });
        } else {
          res.send({ status: 'OK', toolToVote: toolToVote });
        }
      });
    }
  });
};


  // // process the vote if voted down
  // if(!req.body.vote) {
  //   Tool.find({ _id: req.params.id, 'downvotes': req.user._id }, function(err, data) {
  //     if(!data.length)
  //   });
  // }

function handleError(res, err) {
  return res.status(500).send(err);
}