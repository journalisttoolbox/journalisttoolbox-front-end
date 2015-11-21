'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolListSchema = new Schema({
  userID: String,
  toolListName: String,
  description: String,
  featured: {
    type: Boolean,
    default: false
  },
  tools: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Tool' },
    name: String,
    jtWhat: String,
    jtWhy: String
  }]
});

module.exports = mongoose.model('ToolList', ToolListSchema);