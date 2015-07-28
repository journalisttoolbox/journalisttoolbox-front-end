(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .run(['$log', '$cookies', '$rootScope', runBlock]);

  /** @ngInject */

  function runBlock($log, $cookies, $rootScope) {
    $log.debug('runBlock end');
    $rootScope.loggedInUser = $cookies.getObject('user');
    // $rootScope.currentUser = 'james';
  }

})();
