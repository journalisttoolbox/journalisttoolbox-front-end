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
    function NavbarCtrl() {}

  }

})();
