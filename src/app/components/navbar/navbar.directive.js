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
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarCtrl($scope, $state) {

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
