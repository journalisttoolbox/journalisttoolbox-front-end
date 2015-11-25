/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// var User = require('../api/user/user.model');

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

// var toolListID  = '55cdfffe481a99ae9705fda1';

// function populate(desiredList, allTools) {
//   desiredList.tools.forEach(function(toolInList) {
//     allTools.forEach(function(tool) {
//       if(toolInList.name === tool.name) {
//         toolInList._id = tool;
//         console.log(toolInList);
//         desiredList.save();
//       }
//     });
//   });
// }

// ToolList.findById(toolListID, function(err, toolList) {
//   Tool.find(function(err, tools) {
//     populate(toolList, tools);
//   });

// });