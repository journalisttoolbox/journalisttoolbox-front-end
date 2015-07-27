(function(){
	
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('ToolCtrl', ToolController);

	/** @ngInject */
	function ToolController($scope, $state, toolService, $stateParams){
		$scope.tool = {};
    toolService.toolResource.get({ id: $stateParams.id })
      .$promise.then(function(data) {
        $scope.tool = data;
      });

      $scope.reviewState = function() {
        $state.go('tool.review');
      };
  }

})();