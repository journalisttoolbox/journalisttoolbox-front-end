'use strict';

angular.module('jtApp')
  .factory('Tool', function ($resource) {
    return $resource('/api/tools/:id/', { id: '@_id' }, {
      save: { method: 'POST', isArray: true },
      'update': { method : 'PUT', params: { id: '@id' } }
      });
  });


    // var toolNotifier = false;
    // var toolName = '';
    

    // Tool.toolAdded = function(name) {
    //   toolNotifier = true;
    //   toolName = name;
    // };

    // // Returns the state of the notficaiton to main 
    // Tool.getState = function() {
    //   return toolNotifier;
    // };

    // // Returns the name of the tool added
    // Tool.getName = function() {
    //   return toolName;
    // };

    // // Returns the status of the tool notifier state
    // Tool.setStateFalse = function() {
    //   toolNotifier = false;
    // };
