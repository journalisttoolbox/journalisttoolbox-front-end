(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ToolController);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams, $state, Auth, ToolList) {
    $scope.tool = {};
    $scope.toolLists = {};
    $scope.toolAvailable = false;

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.loadToolLists = function(toolLists) {
      ToolList.get({ 'id': toolLists })
      .$promise.then(function(lists) {
        $scope.toolLists = lists;
      });
    };

    $scope.addToolToList = function(toolListID) {
      ToolList.update({ 
        id: toolListID, 
        toolToAdd: $scope.tool._id 
      })
      .$promise.then(function(err, data) {

      });
    };

    $scope.reviewState = function() {
      $state.go('tool.review');
    };

    $scope.toolState = function() {
      $state.go('tool');
    };

    $scope.toolVote = function(verdict) {
      Tool.voteTool({
        toolID: $scope.tool._id,
        vote: verdict
      }, function() {
        // Hit the API again to return up to date data
        Tool.get({ id: $stateParams.id })
          .$promise.then(function(data) {
            $scope.tool = data[0];
          });

        $scope.hasUserVoted = true;
      });
    };

    // redirect the user to their admin panel
    $scope.createNewList = function() {
      if($scope.isLoggedIn()) {
        $state.go('admin.lists');
      } else {
        $state.go('signup');
      }
    };

    $scope.runDefault = (function() {

      if($scope.isLoggedIn()) {
        $scope.getCurrentUser = Auth.getCurrentUser;
        var user = $scope.getCurrentUser();

        if(user.toolLists.length) { 
          // load the toolLists of this user
          $scope.loadToolLists(user.toolLists);
        } else {
          $scope.toolLists = false; 
        }
      }
      
      // instantiate the list dropdown
      $('.ui.dropdown.list').dropdown();

      Tool.get({ id: $stateParams.id })
        .$promise.then(function(data) {
          $scope.tool = data[0];
          $scope.toolAvailable = true;
        });
    })();

  }
  
})();