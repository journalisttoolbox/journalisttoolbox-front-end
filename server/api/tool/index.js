'use strict';

var express = require('express');
var controller = require('./tool.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/category/:name', controller.category);
router.get('/', controller.index);
router.get('/user/:userID', auth.isAuthenticated(), controller.getUserTools);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.put);
router.patch('/:id', auth.isAuthenticated(), controller.put);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;