(function() {

  'use strict';

  angular
  .module('jtApp')
  .controller('ListCtrl', ['$scope', 'Tool', '$stateParams', 'ToolList', 'User', function ($scope, Tool, $stateParams, ToolList, User){

    $scope.tools = {};
    $scope.toolList = {};
    // $scope.errors = {};
    $scope.noTools = false;
    $scope.toolsSearched = false;

    $scope.loadsTools = function(toolsArray) {
      if(toolsArray.length) {
        var toolIDs = [];

        for(var i=0; i<toolsArray.length;i++) {
          if(toolsArray[i]._id == undefined) continue; // Some tools' names don't match up
          toolIDs.push(toolsArray[i]._id);
        }

        Tool.get({ id: toolIDs })
        .$promise.then(function(tools) {
          if(!tools) noTools = true;
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
      $scope.toolsSearched = true;
    };

    $scope.triggerDimmer = function() {
     $('.ui.image').dimmer({on: 'hover'});
   };

   $scope.loadToolList = function() {
    ToolList.get({ id: $stateParams.id })
    .$promise.then(function(toolList) {
      $scope.toolList = toolList[0];

      $scope.loadsTools($scope.toolList.tools);
      console.log($scope.toolList.tools);
    }, function(err) {
      if(err.status === 404) $scope.errors.noList = true;
      if(err.status) $scope.errors.error = err.message;
      $scope.toolsSearched = true;
    });
  };

    // DEFAULT FUNCTION
    $scope.runDefault = (function() {
      $scope.loadToolList();
    })();

  }]);

})();
