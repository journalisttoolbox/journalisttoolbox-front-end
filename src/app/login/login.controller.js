(function(){
	'use strict';

	angular
		.module('journalisttoolboxFrontend')
		.controller('LoginCtrl', ['$scope', '$state', 'Auth', LoginController]);
		
		/** @ngInject */
		function LoginController($scope, $state, Auth){
			$scope.login = function(){
				Auth.login('local', {
					'email': $scope.user.email,
					'password': $scope.user.password
				},
				function(err){
					if(!err) $state.go('home');
					else{
						console.log(err);
					}
				});
			};
		}


})();