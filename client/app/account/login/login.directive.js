(function(){
  'use strict';


  angular
    .module('jtApp')
    .directive('jtLogin', jtLogin);

    /** @ngInject */
      function jtLogin(){
        var directive = {
            restrict: 'E',
            templateUrl: '/app/account/login/login.html',
            controller: LoginCtrl,
            bindToController: true,
            link: function($scope){
                $('.ui.modal.signIn').modal();
                $scope.closeModal = function(){
                $('.ui.modal.signIn').modal('hide');
              };
            }
          };

          return directive;

/** @ngInject */
    function LoginCtrl($scope, $state, Auth, $location, $window){
      $scope.user = {};
      $scope.errors = {};

      $scope.goToSignup = function(){
        $scope.closeModal();
        $state.go('signup');
      };

      $scope.login = function(form){
        $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $scope.closeModal();
          $state.go($state.current, {}, {reload: true});
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    }

  }

})();
