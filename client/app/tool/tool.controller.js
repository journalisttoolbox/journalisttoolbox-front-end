(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ToolController);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams, $state) {
    $scope.tool = {};

    Tool.get({ id: $stateParams.id })
      .$promise.then(function(data) {
        $scope.tool = data[0];
      });

    $scope.toolVote = function(verdict) {
      Tool.voteTool({
        toolID: $scope.tool._id,
        vote: verdict
      }, function() {
        $state.go($state.current, {}, {reload: true});
      });
    };
  }
  
})();