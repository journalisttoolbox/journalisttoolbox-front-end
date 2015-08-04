/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'James Oldfield',
//     email: 'hi@james-oldfield.co',
//     gravUrl: 'http://www.gravatar.com/avatar/e61b9c5c249bc013475fb96f95a5b1f4.jpg?d=mm',
//     role: 'admin',
//     password: 'james'
//   }, {
//     provider: 'local',
//     name: 'nevo',
//     email: 'nevosegal@gmail.com',
//     gravUrl: 'http://www.gravatar.com/avatar/ed580faf7c8d4d3412083924169253de.jpg?d=mm',
//     role: 'admin',
//     password: 'nevo'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });