(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .controller('MainCtrl', MainController);

  /** @ngInject */
  function MainController($scope, createTool, $timeout) {

    $scope.showToolMessage = createTool.getState();
    $scope.toolName = '';

    // If tool is created, fade out the message
    if($scope.showToolMessage) {
      $scope.toolName = createTool.getName();
      $timeout(hideMessage, 1750);
      
      createTool.setStateFalse();
    }

    // Change the state to false to hide the message box
    function hideMessage() {
      $scope.showToolMessage = false;
    }

  }
})();
