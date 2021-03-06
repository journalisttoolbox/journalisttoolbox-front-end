'use strict';

angular.module('jtApp')
  .controller('ExploreCtrl', ['$scope', '$stateParams', '$http', 'User', function ($scope, $stateParams, $http, User) {
    $scope.term = '';
    $scope.tools = [];
    $scope.categories = {};
    $scope.FilterTools = [];
    $scope.Findit = false;
    $scope.category = $stateParams.cat;

    // starting the semantic UI tab
    $('.menu .item').tab();
    $('.ui.dropdown').dropdown();

    $http({ method:'GET', url: 'api/tools/category/' + $scope.category })
      .success(function(data) {
        $scope.tools = data;
    });

    $scope.includeFilter = function(name) {
        var i = $.inArray(name, $scope.FilterTools);
        if (i > -1) {
            $scope.FilterTools.splice(i, 1);
        } else {
            $scope.FilterTools.push(name);
        }
    };

    $scope.triggerDimmer = function() {
       $('.ui.image').dimmer({on: 'hover'});
    }


    $scope.toolFilter = function(tool) {
      $scope.Findit  = false;
        if ($scope.FilterTools.length > 0) {
            //array platorms
          for (var i = tool.platforms.length - 1; i >= 0; i--) {
            if ($.inArray(tool.platforms[i], $scope.FilterTools) >= 0)
                    $scope.Findit  = true;
          };
            //free or not
            if ($.inArray(tool.free, $scope.FilterTools) >= 0)
                $scope.Findit  = true;
        }
        //if no filter or tool find, return the tool
        if($scope.Findit == true || $scope.FilterTools.length == 0)
      return tool;
        else
          return;
    };
}]);
