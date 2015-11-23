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
          if(toolsArray[i]._id == undefined) continue; // Some tools' names don't match up
          toolIDs.push(toolsArray[i]._id);
        }

        Tool.get({ id: toolIDs })
        .$promise.then(function(tools) {
          $scope.tools = tools;

          if(toolsArray[0].jt_what != undefined) {
            toolsArray.forEach(function(toolFromList) {
              $scope.tools.forEach(function(scopedTool) {
                if(toolFromList._id === scopedTool._id) {
                  scopedTool.jtWhat = toolFromList.jt_what;
                  scopedTool.jtWhy = toolFromList.jt_why;
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