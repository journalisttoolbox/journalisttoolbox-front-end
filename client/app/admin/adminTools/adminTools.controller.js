(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminToolsCtrl', AdminToolsController);

  /** @ngInject */
  function AdminToolsController($scope, $state, User, Tool, Auth) {
    $scope.selectedRecordIds = [];

    $scope.loadUsersTools = function(toolsArray) {
      console.log(toolsArray);
      Tool.get({ id: toolsArray })
      .$promise.then(function(tools) {
        console.log(tools);
        // $scope.toolList = {};
        // $scope.toolList = tools.tools;

        // if($scope.toolList.length) {
        //   $scope.toolsFound = true;
        // } else {
        //   $scope.toolsNotFound = true;
        // }
      });
    };

    $scope.loadAllTools = function() {
      Tool.query()
      .$promise.then(function(data) {
        $scope.toolList = {};
        $scope.toolList = data;

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
      var user = Auth.getCurrentUser();

      if(user.role === 'admin') {
        $scope.loadAllTools();
      } else {
        $scope.loadUsersTools(user.tools);
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