'use strict';

var _ = require('lodash');
var Tool = require('./tool.model');

// Get list of tools
exports.index = function(req, res) {
  Tool.find(function (err, tools) {
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

  var ArrayCategories = req.body.category.split(",");
  ArrayCategories = ArrayCategories.map(function (val) { return val; });

  var ArrayOrganizations = req.body.companies.split(",");
  ArrayOrganizations = ArrayOrganizations.map(function (val) { return val; });

  var newTool = new Tool(
        {
          name: req.body.name,
          developer: req.body.developer,  
          description: req.body.description,
          free: req.body.free,
          price: req.body.price,
          version: req.body.version,
          organization: ArrayOrganizations,
          category: ArrayCategories,
          home_url: req.body.home,
          github_url: req.body.git,
          download_url: req.body.download,
          platforms: [req.body.pc,req.body.mac,req.body.linux,req.body.web],
          upvotes: 0,
          downvotes:0,
          owner: req.body.owner
        }
      );
  newTool.save();

  //return all results including the new one.
  Tool.find(function(err, tools){
    if(err) res.send(err.message);
    res.json(tools);
  });
};

// Updates an existing tool in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tool.findById(req.params.id, function (err, tool) {
    if (err) { return handleError(res, err); }
    if(!tool) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tool, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tool);
    });
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
  Tool.find({'category': new RegExp('^'+req.params.name+'$', "i")}, function(err, tools) {
    if(err) res.send(err.message);
    res.json(tools);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}