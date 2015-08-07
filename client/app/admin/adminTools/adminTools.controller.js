(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminToolsCtrl', AdminToolsController);

  /** @ngInject */
  function AdminToolsController($scope, $state, User, Tool, Auth) {
    $scope.selectedRecordIds = [];
    $scope.toolList = {};

    $scope.getCurrentUser = Auth.getCurrentUser;
    var user = $scope.getCurrentUser();

    $scope.loadUsersTools = function(toolsArray) {
      Tool.get({ id: toolsArray })
      .$promise.then(function(tools) {
        $scope.toolList = tools;

        if($scope.toolList.length) {
          $scope.toolsFound = true;
        } else {
          $scope.toolsNotFound = true;
        }
      });
    };

    $scope.loadAllTools = function() {
      Tool.query()
      .$promise.then(function(data) {
        $scope.toolList = {};
        $scope.toolList = data;

        console.log($scope.toolList);

        if($scope.toolList.length) {
          $scope.toolsFound = true;
        } else {
          $scope.toolsNotFound = true;
        }
      });
    };

    if(!Auth.isLoggedIn()) {
      $state.go('signup'); 
    } else {
      if(user.role === 'admin') {
        $scope.loadAllTools();
      } else if (user.role === 'user') {
        // Get user's tools from the DB, global user variable might not be up to date
        User.get()
          .$promise.then(function(user) {
            if(user.tools.length) { 
              // load the tools of this user
              $scope.loadUsersTools(user.tools);
            } else {
              $scope.toolsNotFound = true; 
            }
          });
      } else {
        $scope.toolsNotFound = true;
      }      
    }

    // Remove a tool
    $scope.removeTool = function(toolID) {
      Tool.remove({ id: toolID }, function() {
        $state.go($state.current, {}, {reload: true});
        $scope.selectedRecordIds = [];
      });
    };

    // update a tool property
    $scope.updateTool = function(updatedTool) {
      Tool.update({ id: updatedTool._id }, updatedTool, function(data) {
        console.log(data);
      });
    };

    $scope.alterSelect = function(toolID) {
      // Location of element
      var present = $scope.selectedRecordIds.indexOf(toolID);

      // If not found, add
      if (present < 0) {
        $scope.selectedRecordIds.push(toolID);
      // If found, remove
      } else {
        $scope.selectedRecordIds.splice(present, 1);
      }
    };

  }
})();