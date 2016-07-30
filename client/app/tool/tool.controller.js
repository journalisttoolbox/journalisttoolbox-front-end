(function() {

'use strict';

  angular
    .module('jtApp')
    .controller('ToolCtrl', ['$scope','Tool', '$stateParams', '$state', 'User', 'Auth', 'ToolList', '$timeout', ToolController]);

  /** @ngInject */
  function ToolController($scope, Tool, $stateParams, $state, User, Auth, ToolList, $timeout) {
    $scope.tool = {};
    $scope.toolAvailable = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.addedToList = false;
    $scope.errors = {};

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    if($scope.isLoggedIn()) {
      $scope.user = User.get();
    }

    $scope.loadToolLists = function() {
      $scope.toolLists = {};
      if($scope.user.toolLists.length) { 
        ToolList.get({ 'id': $scope.user.toolLists })
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
          addTool: true,
          toolID: $scope.tool._id 
        }, function(data) {
          $scope.listErrors = {};
          $scope.toolListAltered = data;
          $scope.showAddedToListMessage();
        }, function(err) {
          $scope.errors.listError = err.data.error;
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

    $scope.addToFavourites = function(toolID, name) {
      User.addRemoveFavourites({ id: $scope.user._id }, {
        toolID: toolID,
        name: name,
        addTool: true
      }, function(data) {
        $scope.toolListAltered = data;
        $scope.showAddedToListMessage();
      }, function(err) {
        $scope.errors.listError = err.data.error;
      });
    };

    // DEFAULT FUNCTION
      $scope.runDefault = (function() {
        //initialize the values for the ewview
        $scope.easeOfUse = 0;
        $scope.timeSpentLearning = 0;
        $scope.timeSpentProducing = 0;
        $scope.satisfiedWithTool = 0;
        $scope.wouldUseAgain = 0;
        // instantiate the list dropdown
        $('.ui.dropdown.list').dropdown();

        Tool.get({ id: $stateParams.id })
          .$promise.then(function(data) {
            $scope.tool = data[0];
            $scope.toolAvailable = true;

            //get the reviews score
            for (var i = $scope.tool.reviews.length - 1; i >= 0; i--) {
              $scope.easeOfUse += $scope.tool.reviews[i].easeOfUse;
              $scope.timeSpentLearning += $scope.tool.reviews[i].timeSpentLearning;
              $scope.timeSpentProducing += $scope.tool.reviews[i].timeSpentProducing;
              $scope.satisfiedWithTool += $scope.tool.reviews[i].satisfiedWithTool;
              $scope.wouldUseAgain += $scope.tool.reviews[i].wouldUseAgain;
            };

            if($scope.tool.reviews.length > 0)
            {
              $scope.easeOfUse = $scope.easeOfUse / $scope.tool.reviews.length;
              $scope.timeSpentLearning = $scope.timeSpentLearning / $scope.tool.reviews.length;
              $scope.timeSpentProducing = $scope.timeSpentProducing / $scope.tool.reviews.length;
              $scope.satisfiedWithTool = $scope.satisfiedWithTool / $scope.tool.reviews.length;
              $scope.wouldUseAgain = $scope.wouldUseAgain / $scope.tool.reviews.length;
              $scope.ReviewsExist = true;
            }


            $('#progressUse').progress({value: $scope.easeOfUse});
            $('#progressProd').progress({value: $scope.timeSpentProducing});
            $('#progressSat').progress({value: $scope.satisfiedWithTool});
            $('#progressAgain').progress({value: $scope.wouldUseAgain});            
            $('#progressLearn').progress({value: $scope.timeSpentLearning});

            //score of the tool
            $scope.ToolScore = ($scope.easeOfUse+$scope.timeSpentLearning+$scope.timeSpentProducing+$scope.satisfiedWithTool+$scope.wouldUseAgain) / 5;
                
          }, function(err) {
            $scope.errors.noTool = true;
          });  
      })();

  }
  
})();