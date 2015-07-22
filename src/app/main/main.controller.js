(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .controller('MainCtrl', MainController);

  /** @ngInject */
  function MainController($scope, toolService, $timeout) {

    $scope.showToolMessage = toolService.getState();
    $scope.toolName = '';

    // If tool is created, fade out the message
    if($scope.showToolMessage) {
      $scope.toolName = toolService.getName();
      $timeout(hideMessage, 1750);
      
      toolService.setStateFalse();
    }

    // Change the state to false to hide the message box
    function hideMessage() {
      $scope.showToolMessage = false;
    }

  }
})();
