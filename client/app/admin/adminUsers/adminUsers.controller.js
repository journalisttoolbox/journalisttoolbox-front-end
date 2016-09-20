(function(){
  'use strict';

  angular
  .module('jtApp')
  .controller('AdminUsersCtrl', ['$scope', 'User', '$state', 'Auth', AdminUsersController ]);

  /** @ngInject */
  function AdminUsersController($scope, User, $state, Auth) {
    $scope.forbidden = true;
    $scope.selectedRecordIds = [];
    $scope.showUsers = {};

    // GET all the users
    $scope.loadUsers = function() {
      User.query()
      .$promise.then(function(data) {
        $scope.forbidden = false;
        $scope.usersList = {};
        $scope.usersList = data;
        var numUsers = $scope.usersList.length;
        var largestNumFields = 0;
        var ix = 0;
        for(var i=0; i<numUsers; i++){
          if(Object.keys($scope.usersList[i]).length > largestNumFields){
              ix = i;
              largestNumFields = Object.keys($scope.usersList[i]).length;
          }
        }

        $scope.collectionHeaders = Object.keys($scope.usersList[ix]);
      }, function(err) {
        if (err.status === 403) {
          $scope.forbidden = true;
        }
      });
    };

    if(!Auth.isAdmin()) {
      $state.go('signup');
    } else {
      $scope.loadUsers();
    }

    // DELETE a user
    $scope.removeUser = function(userID) {
      User.remove({ id: userID }, function() {
        $scope.loadUsers();
        $scope.selectedRecordIds = [];
      });
    };

    // PUT a user property
    $scope.updateUser = function(updatedUser) {
      User.update({ id: updatedUser._id }, updatedUser, function(data) {
        console.log(data);
      });
    };

    $scope.showUserTable = function(user){
      $scope.showUsers[user._id] == true ? $scope.showUsers[user._id] = false : $scope.showUsers[user._id] = true;
    }
    // $scope.alterSelect = function(userID) {
    //   // Location of element
    //   var present = $scope.selectedRecordIds.indexOf(userID);
    //
    //   // If not found, add
    //   if (present < 0) {
    //     $scope.selectedRecordIds.push(userID);
    //   // If found, remove
    //   } else {
    //     $scope.selectedRecordIds.splice(present, 1);
    //   }
    // };




  }
})();
