(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .factory('toolService', toolService);

    function toolService($http, $state, $resource) {
      var toolNotifier = false;
      var toolName = '';

      // Tool service resource
      toolService.toolResource = 
        $resource('http://localhost:3030/api/tools/:id', {id: '@id'}, {
          save: { method: 'POST', isArray: true }
        });

      toolService.toolAdded = function(name) {
        toolNotifier = true;
        toolName = name;
      };

      // Returns the state of the notficaiton to main 
      toolService.getState = function() {
        return toolNotifier;
      };

      // Returns the name of the tool added
      toolService.getName = function() {
        return toolName;
      };

      // Returns the status of the tool notifier state
      toolService.setStateFalse = function() {
        toolNotifier = false;
      };
      
      return toolService;
    }
})();
