/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// var User = require('../api/user/user.model');
//
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Newsroom Tools',
//     email: 'newsroom@tools.com',
//     gravUrl: 'http://www.gravatar.com/avatar/?d=mm',
//     role: 'admin',
//     tools: [],
//     toolLists: [],
//     favourites: [],
//     password: 'newsr00m'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

/**
 * Populates the toolLists with the correct IDs.
 */

// var ToolList = require('../api/toolList/toolList.model');
// var Tool     = require('../api/tool/tool.model');
//
// function populate(desiredList, allTools) {
//   desiredList.tools.forEach(function(toolInList) {
//     allTools.forEach(function(tool) {
//       if(toolInList.name === tool.name) {
//         toolInList._id = tool;
//         desiredList.save();
//       }
//     });
//   });
// }
// ToolList.find({}, function(err, toolList) {
//   Tool.find(function(err, tools) {
//     toolList.forEach(function(list) {
//       populate(list, tools);
//     });
//   });
// });
