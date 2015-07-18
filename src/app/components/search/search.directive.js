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
			$scope.tools = {};
			$scope.noResults = false;

			$scope.search = function(){
				$scope.tools = {};
				$scope.loading = true;
				$http({
					method: 'GET',
					url: 'http://localhost:3030/api/tools/search/' + $scope.term
				}).success(function(data){

					if(data.length == 0){
						$scope.noResults = true;
					}
					else {
						$scope.noResults = false;
					}
					
					$scope.tools = data;
					$scope.loading = false;
				});
			};
		}
	}

})();