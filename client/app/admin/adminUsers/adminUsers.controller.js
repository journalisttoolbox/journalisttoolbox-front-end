(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminUsersCtrl', ['$scope', 'User', AdminUsersController ]);

  /** @ngInject */
  function AdminUsersController($scope, User) {
    $scope.forbidden = true;
    $scope.selectedRecordIds = [];

    // GET all the users
    $scope.loadUsers = function() {
      User.query()
      .$promise.then(function(data) {
        $scope.forbidden = false;
        $scope.usersList = {};
        $scope.usersList = data;
      }, function(err) {
        if (err.status === 403) {
          $scope.forbidden = true;
        }
      });
    };

    $scope.loadUsers();

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

    $scope.alterSelect = function(userID) {
      // Location of element
      var present = $scope.selectedRecordIds.indexOf(userID);

      // If not found, add
      if (present < 0) {
        $scope.selectedRecordIds.push(userID);
      // If found, remove
      } else {
        $scope.selectedRecordIds.splice(present, 1);
      }
    };




  }
})();