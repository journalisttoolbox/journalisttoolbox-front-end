(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', AdminController);

  /** @ngInject */
  function AdminController($scope, $state, toolService) {

      $scope.loadTools = function() {
        toolService.toolResource.query()
        .$promise.then(function(data) {
          $scope.toolList = data;
        });
      };

      $scope.loadTools();

      // Remove a tool
      $scope.removeTool = function(toolID) {
        toolService.toolResource.remove({ id: toolID }, function() {
          $scope.toolList = {};
          $scope.loadTools();
        });
      };

      // update a tool property
      $scope.updateTool = function(updatedTool) {
        toolService.toolResource.update({ id: updatedTool._id }, updatedTool, function(data) {
          console.log(data);
        });
      };


    // $scope.test = toolService.toolResource.get({id:'55ace01dd6aaccae10cddcc6'});

    // toolService.toolResource.update({id: '55ace01dd6aaccae10cddcc6'}, function(data) {
    //   console.log('hi');
    // });

  }
})();