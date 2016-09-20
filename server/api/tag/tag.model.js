'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  text: String
});

module.exports = mongoose.model('Tag', TagSchema);
