'use strict';

var express = require('express');
var controller = require('./tool.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/category/:name', controller.category); // Tools of an individual category
router.get('/', controller.index); // Get all tools
router.get('/:id', controller.show); // Get a single tool by ID

router.post('/', auth.isAuthenticated(), controller.create); // Post a new tool
router.patch('/:id/vote', auth.isAuthenticated(), controller.voteTool); // Vote for a tool
router.put('/:id', auth.isAuthenticated(), controller.put);

router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;