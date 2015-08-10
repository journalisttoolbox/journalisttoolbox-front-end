(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ListCtrl', ListController);

  /** @ngInject */
  function ListController($scope, Tool, $stateParams, $state, User, Auth, ToolList) {
    $scope.tools = {};
    $scope.toolList = {};
    $scope.toolsAvailable = false;
    $scope.errors = {};
    $scope.noTools = true;
  
    $scope.loadsTools = function(toolsArray) {
      if(toolsArray.length) {
        Tool.get({ id: toolsArray })
          .$promise.then(function(tools) {
            $scope.tools = tools;
            $scope.noTools = false;
          });
      } else {
        $scope.noTools = true;
      }
    };

    $scope.loadToolList = function() {
      ToolList.get({ id: $stateParams.id })
        .$promise.then(function(toolList) {
          $scope.toolList = toolList[0];

          $scope.loadsTools($scope.toolList.tools);
        });
    };

    // DEFAULT FUNCTION
      $scope.runDefault = (function() {
        $('.ui.dropdown.list').dropdown();
        $scope.loadToolList();
      })();

  }
  
})();