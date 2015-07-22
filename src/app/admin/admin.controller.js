(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', AdminController);

  /** @ngInject */
  function AdminController($scope, toolService) {
    // $scope.toolList = toolService.getTools();
  }
})();