(function() {
  'use strict';

  angular
    .module('jtApp')
    .directive('jtSearch', jtSearch);

  function jtSearch(){
    var directive = {
      restirct: 'E',
      templateUrl: '/app/main/search/search.html',
      controller: SearchController,
    };

    return directive;
    /** @ngInject */
    function SearchController($scope, $http, Tool){
      $scope.term = "";
      $scope.noResults = false;
      $scope.ShowFilter = false;
      $scope.filters = {};
      $scope.tools = [];
      $scope.allTools = [];

      //filter var      
      $scope.FilterTools = [];
      $scope.Findit = false;

      //starting the semantic UI accordion
      $('.menu .item').tab();

      Tool.query()
        .$promise.then(function(data) {
          $scope.allTools = data;
        });

      $scope.onKeyUp = function(){
        if($scope.term.length >= 3) {
          $scope.tools = $scope.allTools;
          //show the filter options
          $scope.ShowFilter = true;
        }
        else{
          $scope.tools = [];    
          //hide the filter options
          $scope.ShowFilter = false;
        }
      };

      $scope.triggerDimmer = function() {
           $('.ui.image').dimmer({on: 'hover'});
      }

      $scope.includeFilter = function(name) {
        var i = $.inArray(name, $scope.FilterTools);
        if (i > -1) {
            $scope.FilterTools.splice(i, 1);
        } else {
            $scope.FilterTools.push(name);
        }
      };

          $scope.toolFilter = function(tool) {
          $scope.Findit  = false;

            if ($scope.FilterTools.length > 0) {
                //array platorms
              for (var i = tool.platforms.length - 1; i >= 0; i--) {
                if ($.inArray(tool.platforms[i], $scope.FilterTools) >= 0)
                $scope.Findit  = true;
              }          
                //free or not
                if ($.inArray(tool.price, $scope.FilterTools) >= 0 && !$scope.Findit)
                  $scope.Findit  = true; 
                //array platorms
                if(!$scope.Findit){
                for (var i = tool.categories.length - 1; i >= 0; i--) {
                  if ($.inArray(tool.categories[i], $scope.FilterTools) >= 0)
                          $scope.Findit  = true;
                }
              }
            }      
            //if no filter or tool find, return the tool
            if($scope.Findit || $scope.FilterTools.length === 0)
          return tool;
            else
              return;
          };
    }
  }

})();