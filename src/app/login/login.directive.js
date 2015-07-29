(function(){
	'use strict';

	angular
		.module('journalisttoolboxFrontend')
		.directive('jtLogin', jtLogin);
		
/** @ngInject */
	function jtLogin(){
	 	var directive = {
	      restrict: 'E',
	      templateUrl: 'app/login/login.html',
	      controller: LoginController,
	      bindToController: true,
				link: function($scope){
				    $('.ui.modal').modal();
				    $scope.closeModal = function(){
					    	$('.ui.modal').modal('hide');
				    }
				}
	    };

	    return directive;

		/** @ngInject */
		function LoginController($scope, $state, Auth){
			$scope.login = function(){
				Auth.login('local', {
					'email': $scope.user.email,
					'password': $scope.user.password
				},
				function(err){
					if(!err) {
						$state.go('home');
						$scope.closeModal();
						$scope.user.email = "";
						$scope.user.password = "";
					}
					else{
						console.error(err);
					}
				});
			};
		}

	}

})();