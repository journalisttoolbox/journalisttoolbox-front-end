(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', AdminController);

  /** @ngInject */
  function AdminController($scope, toolService) {
    $scope.toolList = toolService.toolResource.query();
    console.log($scope.toolList);

    $scope.addToolState = false;

    $scope.addTool = function() {
      $scope.addToolState = true;
    };
  }
})();