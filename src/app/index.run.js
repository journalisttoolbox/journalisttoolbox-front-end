(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
