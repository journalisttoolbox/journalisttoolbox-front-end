(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminToolsCtrl', AdminToolsController);

  /** @ngInject */
  function AdminToolsController($scope, $state, Tool) {

    $scope.selectedRecordIds = [];

    $scope.loadTools = function() {
      Tool.query()
      .$promise.then(function(data) {
        $scope.toolList = {};
        $scope.toolList = data;
      });
    };

    $scope.loadTools();

    // Remove a tool
    $scope.removeTool = function(toolID) {
      Tool.remove({ id: toolID }, function() {
        $scope.loadTools();
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