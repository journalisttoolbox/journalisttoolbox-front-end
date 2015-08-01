(function() {

  'use strict';

    angular
    .module('jtApp')
    .directive('jtNavbar', jtNavbar);

 /** @ngInject */
  function jtNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: NavbarCtrl,
      bindToController: true,
      link: function($scope){
        $scope.showModal = function(){
          $('.ui.modal.signIn').modal('show');
        };
      }
    };
    return directive;
  }

      /** @ngInject */
    function NavbarCtrl($scope, Auth, $location){
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }];

      $scope.isCollapsed = true;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.logout = function() {
        Auth.logout();
        $location.path('/');
      };

      $scope.isActive = function(route) {
        return route === $location.path();
      };      
    }

})();
