'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolSchema = new Schema({
  name: String,
  developer: String,  
  description: String,
  free: Boolean,
  price: Number,
  version: String,
  companies: Array,
  categories: Array,
  platforms: Array,
  upvotes: Number,
  downvotes: Number,
  owner: String,
  uploaded_date: String
});

module.exports = mongoose.model('Tool', ToolSchema);