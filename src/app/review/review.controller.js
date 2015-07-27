(function() {

  'use strict';

  angular
  .module('journalisttoolboxFrontend')
  .controller('ReviewCtrl', ReviewController);

  /** @ngInject */
  function ReviewController($scope, $state, $stateParams, reviewService, toolService) {
    console.log('hi');
  }
})();