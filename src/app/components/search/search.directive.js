(function(){
	'use strict';
	angular
		.module('journalisttoolboxFrontend')
		.directive('jtSearch', jtSearch);

	/** @ngInject */
	function jtSearch(){
		var directive = {
			restirct: 'E',
			templateUrl: 'app/components/search/search.html',
			controller: SearchController,
		};

		return directive;
		/** @ngInject */
		function SearchController($scope, $http){
			$scope.term = "";
			$scope.filters = {};
			$scope.tools = [];
			var allTools = {};
			var pterm = "";

			$http({
					method: 'GET',
					url: 'http://localhost:3030/api/tools/'
				}).success(function(data){
					allTools = data;
			});

			$scope.onKeyUp = function(){
				if($scope.term.length >= 3){
					$scope.tools = allTools;
				}
				else{
					$scope.tools = [];
				}
			}
		}
	}

})();