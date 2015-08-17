(function() {

  'use strict';

  angular
  .module('jtApp')
  .controller('ToolReviewCtrl', ToolReviewCtrl);

  /** @ngInject */
  function ToolReviewCtrl($scope, Tool, $state, $timeout, Auth) {

    $scope.reviewPosted = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = {};

    if($scope.isLoggedIn()) {
      $scope.user = $scope.$parent.user;
    }

    $scope.hideReviewMessage = function() {
      $scope.reviewPosted = false;
      $state.go('main', {}, {reload: true});
    };

    $scope.showReviewMessage = function() {
      $scope.reviewPosted = true;

      // Hide the review message automatically
      $timeout(function() {
        if($scope.reviewPosted) {
          $scope.hideReviewMessage();
        }
      }, 5000);
    };

    // Pre-populate slider with default values
    $scope.slider = {
      easeOfUse: 5,
      timeSpentLearning: 5,
      timeSpentProducing: 5,
      satisfiedWithTool: 5,
      wouldUseAgain: 5
    };

    $scope.postReview = function() {
      // Convert strings to numbers
      for(var key in $scope.slider) {
        if ($scope.slider.hasOwnProperty(key)) {
          $scope.slider[key] = parseInt($scope.slider[key]);
        }
      }
      $scope.slider.userID = $scope.user._id;
      $scope.slider.email = $scope.user.email;

      if($scope.$parent.toolAvailable) {
        Tool.postReview({ 
          toolID: $scope.$parent.tool._id, 
          review: $scope.slider 
        })
        .$promise.then(function(data) {
          if(data.status === 'OK') {
            $scope.showReviewMessage();
          } 
        });
      }
    };
  }
})();