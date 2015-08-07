(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminListsCtrl', AdminListsController);

  /** @ngInject */
  function AdminListsController($scope, $state, User, ToolList, Auth) {
    $scope.selectedRecordIds = [];
    $scope.toolList = {};

    $scope.getCurrentUser = Auth.getCurrentUser;
    var user = $scope.getCurrentUser();

    $scope.loadUsersTools = function() {
      // ToolList.save({ userID: user._id, toolListName: 'toolListName' });
      // .$promise.then(function(tools) {
      //   $scope.toolList = tools;

      //   if($scope.toolList.length) {
      //     $scope.toolsFound = true;
      //   } else {
      //     $scope.toolsNotFound = true;
      //   }
      // });
    };

    $scope.loadUsersTools();

    // $scope.loadAllTools = function() {
    //   Tool.query()
    //   .$promise.then(function(data) {
    //     $scope.toolList = {};
    //     $scope.toolList = data;

    //     console.log($scope.toolList);

    //     if($scope.toolList.length) {
    //       $scope.toolsFound = true;
    //     } else {
    //       $scope.toolsNotFound = true;
    //     }
    //   });
    // };

    // if(!Auth.isLoggedIn()) {
    //   $state.go('signup'); 
    // } else {
    //   if(user.role === 'admin') {
    //     $scope.loadAllTools();
    //   } else if (user.role === 'user') {
    //     // Get user's tools from the DB, global user variable might not be up to date
    //     User.get()
    //       .$promise.then(function(user) {
    //         if(user.tools.length) { 
    //           // load the tools of this user
    //           $scope.loadUsersTools(user.tools);
    //         } else {
    //           $scope.toolsNotFound = true; 
    //         }
    //       });
    //   } else {
    //     $scope.toolsNotFound = true;
    //   }      
    // }

  }
})();