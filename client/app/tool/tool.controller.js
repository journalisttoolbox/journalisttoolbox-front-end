(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ToolController);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams, $state, User, Auth, ToolList, $timeout) {
    $scope.tool = {};
    $scope.toolAvailable = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.addedToList = false;
    $scope.errors = {};
    $scope.listErrors = {};

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    if($scope.isLoggedIn()) {
      var user = User.get();
    }
  
    $scope.loadToolLists = function() {
      $scope.toolLists = {};
      if(user.toolLists.length) { 
        ToolList.get({ 'id': user.toolLists })
        .$promise.then(function(lists) {
          $scope.toolLists = lists;
        });
      } else {
        $scope.toolLists = false; 
      }
    };

    /*
     * Functions to deal with showing error or success messages when a tool has been added to a user's list
     */
      $scope.addToolToList = function(toolListID) {
        ToolList.update({ 
          id: toolListID, 
          toolToAdd: $scope.tool._id 
        }, function(data) {
          $scope.listErrors = {};
          $scope.toolListAltered = data;
          $scope.showAddedToListMessage();
        }, function(err) {
          $scope.listErrors.error = err.data.error;
        });
      };

      $scope.hideAddedToListMessage = function() {
        $scope.addedToList = false;
        $state.go('admin.lists', {}, {reload: true});
      };

      $scope.showAddedToListMessage = function() {
        $scope.addedToList = true;

        // Hide the tool list success message automatically
        $timeout(function() {
          if($scope.addedToList) {
            $scope.hideAddedToListMessage();
          }
        }, 5000);
      };

      // redirect the user to their admin panel if new list is created.
      $scope.createNewList = function() {
        if($scope.isLoggedIn()) {
          $state.go('admin.lists');
        } else {
          $state.go('signup');
        }
      };

    /*
     * State functions
     */
      $scope.reviewState = function() {
        $state.go('tool.review');
      };

      $scope.toolState = function() {
        $state.go('tool');
      };

    $scope.toolVote = function(verdict) {
      Tool.voteTool({
        toolID: $scope.tool._id,
        vote: verdict
      }, function() {
        // Hit the API again to return up to date data
        Tool.get({ id: $stateParams.id })
          .$promise.then(function(data) {
            $scope.tool = data[0];
          });

        $scope.hasUserVoted = true;
      });
    };

    $scope.addToFavourites = function(toolID) {
      User.addRemoveFavourites({ id: user._id }, {
        toolID: toolID,
        addTool: true
      }, function(data) {
        $scope.toolListAltered = data;
        $scope.showAddedToListMessage();
      }, function(err) {
        $scope.listErrors.error = err.data.error;
      });
    };

    // DEFAULT FUNCTION
      $scope.runDefault = (function() {
        // instantiate the list dropdown
        $('.ui.dropdown.list').dropdown();

        Tool.get({ id: $stateParams.id })
          .$promise.then(function(data) {
            $scope.tool = data[0];
            $scope.toolAvailable = true;
          });
      })();

  }
  
})();