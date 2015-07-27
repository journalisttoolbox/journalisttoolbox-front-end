(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .run(['$log', runBlock]);

  /** @ngInject */

  function runBlock($log) {
    $log.debug('runBlock end');

  }

})();
