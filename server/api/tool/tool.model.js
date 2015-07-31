'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolSchema = new Schema({
  name: String,
  developer: String,  
  description: String,
  free: Boolean,
  price: String,
  version: String,
  organization: Array,
  category: Array,
  platforms: Array,
  upvotes: Number,
  downvotes: Number,
  owner: String,
  uploaded_date: Date
});

module.exports = mongoose.model('Tool', ToolSchema);