(function(){
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('CreateCtrl', CreateController);

	/** @ngInject */
	function CreateController($scope, $http, $stateParams, $state, createTool){

    $scope.submitTool = function(){
      console.log($scope.formData);
      createTool.post($scope.formData);
		};

    $scope.test = false;
	}
})();
