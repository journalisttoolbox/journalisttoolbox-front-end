(function(){
	
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('ToolCtrl', ToolController);

	/** @ngInject */
	function ToolController($scope, $http, $stateParams){
		$scope.tool = {};
		$http({method:'GET', url:'http://localhost:3030/api/tools/' + $stateParams.id})
			.success(function(data){
				$scope.tool = data;
			});
	}

})();