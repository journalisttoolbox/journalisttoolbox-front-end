(function(){
	'use strict';

	angular
		.module('journalisttoolboxFrontend')
		.controller('SignupCtrl', SignupController);

		/** @ngInject */
		function SignupController($scope, $http, Auth, $state){

			$scope.register = function(){
				Auth.createUser({
					firstName: $scope.fname,
					lastName: $scope.lname,
					email: $scope.email,
					username: $scope.username,
					password: $scope.pass
				},
				function(){
					$state.go('home');
				});
			};

		}

})();