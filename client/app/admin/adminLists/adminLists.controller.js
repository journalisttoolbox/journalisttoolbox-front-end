(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminListsCtrl', AdminListsController);

  /** @ngInject */
  function AdminListsController($scope, $state, User, ToolList, Auth) {
    $scope.toolLists = {};
    $scope.user = null;

    $scope.loadUsersToolLists = function(toolListsArray) {
      ToolList.get({ 'id': toolListsArray })
      .$promise.then(function(toolLists) {
        $scope.toolLists = toolLists;

        if($scope.toolLists.length) {
          $scope.toolListsFound = true;
        } else {
          $scope.toolListsNotFound = true;
        }
      });
    };

    $scope.saveList = function() {
      $scope.newList.userID = $scope.user._id;
      ToolList.save($scope.newList)
      .$promise.then(function(data, err) {
        if(err) { $scope.errors = err; }
        $scope.toolLists.push(data);
      });
    };

    if(!Auth.isLoggedIn()) {
      $state.go('signup'); 
    } else {
      // Get user's toolLists from the DB, global user variable might not be up to date
      User.get()
        .$promise.then(function(user) {
          $scope.user = user;
          if(user.toolLists.length) { 
            // load the toolLists of this user
            $scope.loadUsersToolLists(user.toolLists);
          } else {
            $scope.toolListsNotFound = true; 
          }
        });
    }

    // Remove a toolList
    $scope.removeToolList = function(list) {
      ToolList.remove({ id: list._id });
      $state.go($state.current, {}, {reload: true});
    };

  }
})();