'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolListSchema = new Schema({
  userID: String,
  toolListName: String,
  tools: [String]
});

module.exports = mongoose.model('ToolList', ToolListSchema);