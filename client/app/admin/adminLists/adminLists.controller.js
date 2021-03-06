(function(){
  'use strict';
  
  angular
  .module('jtApp')
  .controller('AdminListsCtrl', ['$scope','$state','User','ToolList','Auth', function ($scope, $state, User, ToolList, Auth){

    $scope.toolLists = [];
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

    $scope.goToList = function(listID) {
      $state.go('list', { id: listID }, {reload: true});
    };

    $scope.saveList = function() {
      $scope.newList.userID = $scope.user._id;
      ToolList.save($scope.newList)
      .$promise.then(function(data, err) {
        if(err) { $scope.errors = err; }
        $scope.toolLists.push(data);
        $state.go($state.current, {}, {reload: true});
      });
    };

    if(!Auth.isLoggedIn()) {
      $state.go('signup'); 
    } else {
      // Get user's toolLists from the DB, global user variable might not be up to date
      User.get()
        .$promise.then(function(user) {
          $scope.user = user;
          $scope.favourites = user.favourites;
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
      list.userID = $scope.user._id;
      ToolList.remove({ id: list._id });
      $state.go($state.current, {}, {reload: true});
    };

    $scope.removeFromToolList = function(listID, toolID) {
      ToolList.update({ 
        id: listID, 
        addTool: false,
        toolID: toolID
      }, function() {
        $state.go($state.current, {}, {reload: true});
      }, function(err) {
        $scope.errors.removeTool = err.data.error;
      });
    };

    $scope.removeFromFavourites = function(toolID, name) {
      User.addRemoveFavourites({ id: $scope.user._id }, {
        toolID: toolID,
        name: name,
        addTool: false
      }, function() {
        $state.go($state.current, {}, {reload: true});
      }, function(err) {
        $scope.errors.removeFavourite = err.data.error;
      });
    };

}])
})();
