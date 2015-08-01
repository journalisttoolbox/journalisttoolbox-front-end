'use strict';

angular.module('jtApp')
  .controller('AdminCtrl', function ($scope, $state) {

    $scope.usersState = function() {
      $state.go('admin.users');
    };
    // State for the tools
    $scope.toolsState = function() {
      $state.go('admin.tools');
    };
  });
