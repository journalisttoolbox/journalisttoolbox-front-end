(function(){
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('CreateCtrl', CreateController);

	/** @ngInject */
	function CreateController($scope, $http, $stateParams){

		$scope.caca = function(){
			//$scope.formData = {};
			$http({
					method: 'POST',
					url: 'http://localhost:3030/api/tools/post',
					data: $scope.formData
            }).success(function(data) {
               alert("inserted");
            })
            .error(function(data) {
                alert("fail");
            });
		};
	}
})();
