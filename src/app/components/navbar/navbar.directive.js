(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $state) {

      $scope.user = {
          forename: 'Chris',
          surname: 'Hutchinson',
          image: 'https://pbs.twimg.com/profile_images/482607943071039488/vcujIxUA.jpeg',
      };

      $scope.home = function() {
        $state.go('home', {}, {reload: true});
      };

      $scope.missingPage = function() {
          alert('Whoops! We\'ve only spent a day on this project during the GEN #newsHack event.\n\nWe\'ll have these pages up very soon.\n\nTry searching for "images", "charts" or "maps" in the meantime for a quick demo.');
      };
    }
  }

})();
