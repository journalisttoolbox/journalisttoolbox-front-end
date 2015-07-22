(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', AdminController);

  /** @ngInject */
  function AdminController($scope, toolService) {
    toolService.toolResource.query()
      .$promise.then(function(data) {
        $scope.toolList = data;
      });

    $scope.test = toolService.toolResource.get({id:'55ace01dd6aaccae10cddcc6'});

    $scope.test.name = 'jim';
    toolService.toolResource.update({id: '55ace01dd6aaccae10cddcc6'}, function(data) {
      console.log('hi');
    });

    $scope.addToolState = false;

    $scope.addTool = function() {
      $scope.addToolState = true;
    };
  }
})();