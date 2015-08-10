'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolListSchema = new Schema({
  userID: String,
  toolListName: String,
  description: String,
  tools: [{ type: Schema.Types.ObjectId, ref: 'Tool' }]
});

module.exports = mongoose.model('ToolList', ToolListSchema);