(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .directive('jtNavbar', jtNavbar);

  /** @ngInject */
  function jtNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarCtrl,
      bindToController: true,
      link: function($scope){
        $scope.showModal = function(){
          $('.ui.modal').modal('show');
        };
      }
    };

    return directive;

    /** @ngInject */
    function NavbarCtrl($scope, Auth, $state){
      $scope.logout = function(){
        Auth.logout(function(err){
          if(!err) $state.go('home');
        });
      };
    }

  }

})();
