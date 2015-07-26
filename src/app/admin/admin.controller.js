(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', AdminController);

  /** @ngInject */
  function AdminController($scope, $state, toolService, $filter) {

      $scope.selectedRecordIds = [];

      $scope.loadTools = function() {
        toolService.toolResource.query()
        .$promise.then(function(data) {
          $scope.toolList = {};
          $scope.toolList = data;
        });
      };

      $scope.loadTools();

      // Remove a tool
      $scope.removeTool = function(toolID) {
        toolService.toolResource.remove({ id: toolID }, function() {
          $scope.loadTools();
        });
      };

      $scope.removeMultipleTools = function(arrayOfToolIds) {
        $scope.toolsDeleted = 0;
          toolService.toolResource.remove({ id: arrayOfToolIds }, function() {
              $scope.loadTools();
          });
        $scope.selectedRecordIds = [];
      };

      // update a tool property
      $scope.updateTool = function(updatedTool) {
        toolService.toolResource.update({ id: updatedTool._id }, updatedTool, function(data) {
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