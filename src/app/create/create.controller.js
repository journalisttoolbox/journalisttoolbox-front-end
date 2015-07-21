(function(){
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('CreateCtrl', CreateController);

	/** @ngInject */
	function CreateController($scope, $http, $stateParams, $state, createTool){

	    $scope.caca = function(){
	      //$scope.formData = {};
	      createTool.post($scope.formData);
		};
	}
})();
