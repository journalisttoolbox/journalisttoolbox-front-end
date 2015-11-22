(function() {

  'use strict';

  angular
  .module('jtApp')
  .controller('ListCtrl', ['$scope', 'Tool', '$stateParams', 'ToolList', function ($scope, Tool, $stateParams, ToolList){

    $scope.tools = {};
    $scope.toolList = {};
    $scope.errors = {};
    $scope.noTools = true;
    
    $scope.loadsTools = function(toolsArray) {
      if(toolsArray.length) {
        var toolIDs = [];

        for(var i=0; i<toolsArray.length;i++) {
          toolIDs.push(toolsArray[i]._id);
        }

        Tool.get({ id: toolIDs })
        .$promise.then(function(tools) {
          $scope.tools = tools;

          if(toolsArray[0].jtWhat != undefined) {
            toolsArray.forEach(function(toolFromList) {
              $scope.tools.forEach(function(scopedTool) {
                if(toolFromList._id === scopedTool._id) {
                  scopedTool.jtWhat = toolFromList.jtWhat;
                  scopedTool.jtWhy = toolFromList.jtWhy;
                }
              });
            });
            $scope.noJtDetails = false;
          } else {
            $scope.noJtDetails = true;
          }


          $scope.noTools = false;
        });
      } else {
        $scope.noTools = true;
      }
    };

    $scope.triggerDimmer = function() {
     $('.ui.image').dimmer({on: 'hover'});
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
      $scope.loadToolList();
    })();

  }])
  
})();