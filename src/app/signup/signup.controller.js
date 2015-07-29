(function(){
	'use strict';

	angular
		.module('journalisttoolboxFrontend')
		.controller('SignupCtrl', SignupController);

		/** @ngInject */
		function SignupController($scope, Auth, $state){

			$scope.register = function(){
				Auth.createUser({
					firstName: $scope.user.fname,
					lastName: $scope.user.lname,
					email: $scope.user.email,
					username: $scope.user.username,
					password: $scope.user.pass
				},
				function(err){
					if (!err) $state.go('home');
					else console.log(err);
				});
			};

		}

})();