(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ToolController);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams){
    $scope.tool = {};
    Tool.get({ id: $stateParams.id })
      .$promise.then(function(data) {
        $scope.tool = data;
      });
  }
  
})();