'use strict';

angular.module('jtApp')
  .controller('AdminCtrl', ['$rootScope', '$scope', '$state', 'Auth', function ($rootScope, $scope, $state, Auth) {
    $scope.admin = false;
    $scope.currentUser = Auth.getCurrentUser;
    if(Auth.isAdmin()) {
      $scope.admin = true;
    }

    if(!Auth.isLoggedIn()) {
      $state.go('signup'); 
    }
    
    $scope.usersState = function() {
      $state.go('admin.users', {}, { reload: true });
    };
    $scope.toolsState = function() {
      $state.go('admin.tools', {}, { reload: true });
    };
    $scope.listsState = function() {
      $state.go('admin.lists', {}, { reload: true });
    };

  }]);
