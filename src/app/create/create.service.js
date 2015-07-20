(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .factory('createTool', createTool);

    function createTool($http, $state) {
      var toolNotifier = false;
      var toolName = '';

      // Returns the state of the notficaiton to main 
      createTool.getState = function() {
        return toolNotifier;
      };

      // Returns the name of the tool added
      createTool.getName = function() {
        return toolName;
      };

      createTool.setStateFalse = function() {
        toolNotifier = false;
      };

      // POST method to post to the tools endpoint
      createTool.post = function( formData ) { 
        $http({
          method: 'POST',
          url: 'http://localhost:3030/api/tools/post',
          data: formData})
        .success(function(data) {
          // Redirect to homepage on success
          $state.go('home');
          window.scroll(0, 0); 

          toolNotifier = true;
          toolName = formData.name;

          return data;
        })
        .error(function(err) {
          alert('error: ' + err);
        });
      };
      return createTool;
    }
})();
