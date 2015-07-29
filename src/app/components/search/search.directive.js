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
			$scope.filters = {};
			$scope.tools = [];
			$scope.ShowFilter = false; 
			var allTools = {};
			var pterm = '';
			//filter var			
			$scope.FilterTools = [];
			$scope.Findit = false;

	        //starting the semantic UI accordion
	        $('.ui.accordion').accordion();
        $('.menu .item').tab();

			toolService.toolResource.query()
        .$promise.then(function(data) {
          allTools = data;
        });

			$scope.onKeyUp = function(){
				if($scope.term.length >= 3){
					$scope.tools = allTools;
					//show the filter options
					$scope.ShowFilter = true;
				}
				else{
					$scope.tools = [];		
					//hide the filter options			
					$scope.ShowFilter = false; 
				}
			};

			$scope.includeFilter = function(name) {
	            var i = $.inArray(name, $scope.FilterTools);
	            if (i > -1) {
	                $scope.FilterTools.splice(i, 1);
	            } else {
	                $scope.FilterTools.push(name);
	            }
        	}

        	$scope.toolFilter = function(tool) {
        	$scope.Findit  = false;

            if ($scope.FilterTools.length > 0) {
                //array platorms
            	for (var i = tool.platform.length - 1; i >= 0; i--) {
            		if ($.inArray(tool.platform[i], $scope.FilterTools) >= 0)
                        $scope.Findit  = true;
            	};          
                //free or not
                if ($.inArray(tool.price, $scope.FilterTools) >= 0 && !$scope.Findit)
                    $scope.Findit  = true; 
                //array platorms
                if(!$scope.Findit){
	            	for (var i = tool.category.length - 1; i >= 0; i--) {
	            		if ($.inArray(tool.category[i], $scope.FilterTools) >= 0)
	                        $scope.Findit  = true;
	            	};
	            }
            }      
            //if no filter or tool find, return the tool
            if($scope.Findit || $scope.FilterTools.length == 0)
    			return tool;
            else
            	return;
        	}
		}
	}

})();