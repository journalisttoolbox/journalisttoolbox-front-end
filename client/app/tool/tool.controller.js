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

    $scope.toolVote = function(verdict) {
      Tool.voteTool({
        toolID: $scope.tool._id,
        vote: verdict
      }, function(err, data) {
        console.log('error', err);
        console.log('data', data);
      });
    };
  }
  
})();