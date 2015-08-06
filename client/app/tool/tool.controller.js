(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ToolController);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams, $state) {
    $scope.tool = {};
    $scope.toolAvailable = false;

    Tool.get({ id: $stateParams.id })
      .$promise.then(function(data) {
        $scope.tool = data[0];
        $scope.toolAvailable = true;
      });

    $scope.reviewState = function() {
      $state.go('tool.review');
    };

    $scope.toolState = function() {
      $state.go('tool');
    };

    $scope.toolVote = function(verdict) {
      Tool.voteTool({
        toolID: $scope.tool._id,
        vote: verdict
      }, function() {
        // Hit the API again to return up to date data
        Tool.get({ id: $stateParams.id })
          .$promise.then(function(data) {
            $scope.tool = data[0];
          });

        $scope.hasUserVoted = true;
      });
    };
  }
  
})();