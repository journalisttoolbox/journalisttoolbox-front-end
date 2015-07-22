(function(){
	
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('ToolCtrl', ToolController);

	/** @ngInject */
	function ToolController($scope, toolService, $stateParams){
		$scope.tool = {};
    toolService.toolResource.get({ id: $stateParams.id })
      .$promise.then(function(data) {
        $scope.tool = data;
        console.log('yo! ' + $scope.tool);
      });
  }

})();