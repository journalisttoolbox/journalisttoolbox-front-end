'use strict';

var express = require('express');
var controller = require('./tool.controller');

var router = express.Router();

router.get('/category/:name', controller.category);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.put);
router.patch('/:id', controller.put);
router.delete('/:id', controller.destroy);

module.exports = router;