'use strict';

var express = require('express');
var controller = require('./tag.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index); // Get all tags

// router.post('/', auth.isAuthenticated(), controller.create); // Post a new tag

module.exports = router;
