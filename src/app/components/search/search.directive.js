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
		function SearchController($scope, $http, toolService){
			$scope.term = "";
      $scope.noResults = false;
			$scope.filters = {};
			$scope.tools = [];
			$scope.allTools = {};

			toolService.toolResource.query()
        .$promise.then(function(data) {
          $scope.allTools = data;
        });

			$scope.onKeyUp = function(){
				if($scope.term.length >= 3){
					$scope.tools = $scope.allTools;
				}
				else{
					$scope.tools = [];
				}
			};
		}
	}

})();