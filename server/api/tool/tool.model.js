'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToolSchema = new Schema({
  name: String,
  developer: String,
  description: String,
  documentation: String,
  tutorials: String,
  custom: String,
  installation: String,
  free: Boolean,
  price: String,
  version: String,
  companies: Array,
  categories: Array,
  platforms: Array,
  home_url: String,
  github_url: String,
  download_url: String,
  logo_url: String,
  upvotes: Array,
  downvotes: Array,
  owner: String,
  uploaded_date: String,
  reviews: Array,
  tags: Array,
  ownerIsAdmin: Boolean
});

module.exports = mongoose.model('Tool', ToolSchema);
