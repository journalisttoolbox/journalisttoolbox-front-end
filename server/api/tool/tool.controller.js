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

// Get a certain tool(s)
exports.show = function(req, res) {
  var query = req.params.id.split(",");

  Tool.find({ '_id': { $in: query } }, function(err, tool) {
    if(err) { return handleError(res, err); }
    if(!tool) { return res.status(404).send('Not Found'); }
    return res.json(tool);
  });
};

// Add the 'http://' if not already present
exports.prependHttp = function(url) {
  if(url.indexOf('http') < 0) {
    var prefixedUrl = 'http://' + url;
    return prefixedUrl;
  } else {
    return url;
  }
};

//creating a new tool
exports.create = function(req,res) {

  var NumberOfPlatforms = 0;

  console.log(req.body.companies);

  var cats  = typeof req.body.categories === 'undefined' ? '' : req.body.categories.split(/\s*,\s*/);
  var comps = typeof req.body.companies === 'undefined' ? '' : req.body.companies.split(/\s*,\s*/);
  comps = comps != '' ? comps.filter(function(val) {if (val === "" || !val.trim()) {return false; }return true;}).map(function(val) { return val; }) : '';
  cats  = cats != '' ? cats.filter(function(val) {if (val === "" || !val.trim()) {return false; }return true;}).map(function(val) { return val; }): '';

  var newTool = new Tool(req.body);

  if(!newTool.github_url) {
    newTool.github_url = '';
  } else {
    newTool.github_url = exports.prependHttp(newTool.github_url);
  }
  if(!newTool.home_url) {
    newTool.home_url = '';
  } else {
    newTool.home_url = exports.prependHttp(newTool.home_url);
  }
  if(!newTool.download_url) {
    newTool.download_url = '';
  } else {
    newTool.download_url = exports.prependHttp(newTool.download_url);
  }
  if(!newTool.logo_url) {
    newTool.logo_url = '';
  } else {
    newTool.home_url = exports.prependHttp(newTool.home_url);
  }

  newTool.companies = comps;
  newTool.categories  = cats;
  newTool.upvotes  = [];
  newTool.downvotes  = [];
  newTool.owner = req.body.owner;

  if(req.body.free || req.body.price === 0)
  {
    newTool.price = 0;
    newTool.free = true;
  }
  else
  {
    newTool.free = false;
  }

  if(req.body.pc)
  {
    newTool.platforms[NumberOfPlatforms] = "Windows";
    NumberOfPlatforms++;
  }
  if(req.body.mac)
  {
    newTool.platforms[NumberOfPlatforms] = "MacOS";
    NumberOfPlatforms++;
  }
  if(req.body.linux)
  {
    newTool.platforms[NumberOfPlatforms] = "Linux";
    NumberOfPlatforms++;
  }
  if(req.body.web)
  {
    newTool.platforms[NumberOfPlatforms] = "Web";
    NumberOfPlatforms++;
  }
  if(req.body.other !== undefined)
  {
    newTool.platforms[NumberOfPlatforms] = req.body.other;
  }

  // DATE
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth()+1;
  var year = now.getFullYear();

  var fullDate = day+'/'+month+'/'+year;

  newTool.uploaded_date = fullDate;


  // Redundant platform urls to populate for now
  newTool.windows_url = '';
  newTool.mac_url = '';
  newTool.linux_url = '';

  newTool.save();
  res.json(newTool);
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
          res.statusCode = 500;
          res.send({ error: err });
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

      // If upvoted but downvote is already present, remove the downvote
      if(existingVotes.downvotes) {
        index = toolToVote.downvotes.indexOf(req.user._id);
        toolToVote.downvotes.splice(index, 1);
      }

      // If there isn't already an upvote by this user, add an upvote, else remove it
      if(!existingVotes.upvotes) {
        toolToVote.upvotes.push(req.user._id);
      } else {
        index = toolToVote.upvotes.indexOf(req.user._id);
        toolToVote.upvotes.splice(index, 1);
      }

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

      // If downvoted but upvote is already present, remove the upvote
      if(existingVotes.upvotes) {
        index = toolToVote.upvotes.indexOf(req.user._id);
        toolToVote.upvotes.splice(index, 1);
      }

      // If there isn't already an downvote by this user, add an downvote
      if(!existingVotes.downvotes) {
        toolToVote.downvotes.push(req.user._id);
      } else {
        index = toolToVote.downvotes.indexOf(req.user._id);
        toolToVote.downvotes.splice(index, 1);
      }

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

// PUT a review
exports.postReview = function(req, res, next) {
  Tool.findById(req.params.id, function (err, tool) {
    if(err) res.send(err.message);
    tool.reviews.push(req.body.review);

    tool.save(function(err) {
      if(err) {
        res.statusCode = 500;
        res.send({ error: 'Error with put request' });
      } else {
        res.send({ status: 'OK', tool: tool });
      }
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
