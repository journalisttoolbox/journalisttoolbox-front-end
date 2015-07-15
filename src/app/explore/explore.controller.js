(function(){
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('ExploreCtrl', ExploreController);

	/** @ngInject */
	function ExploreController($scope, $http, $stateParams){
		$scope.tools = {};
		$scope.category = $stateParams.cat;
		$http({method:'GET', url: 'http://localhost:3030/api/tools/category/' + $scope.category})
			.success(function(data){
				$scope.tools = data;
		});
	}
})();