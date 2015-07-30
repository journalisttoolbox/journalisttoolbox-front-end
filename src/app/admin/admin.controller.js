(function(){
  'use strict';
  
  angular
  .module('journalisttoolboxFrontend')
  .controller('AdminCtrl', [ '$scope', '$state', AdminController ]);

  /** @ngInject */
  function AdminController($scope, $state) {
    // State for the users
    $scope.usersState = function() {
      $state.go('admin.users');
    };
    // State for the tools
    $scope.toolsState = function() {
      $state.go('admin.tools');
    };
  }
})();