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
    function NavbarCtrl(Auth, $scope, $location, $state){
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
        $state.go($state.current, {}, {reload: true});
      };

      $scope.isActive = function(route) {
        return route === $location.path();
      };      
    }

})();
