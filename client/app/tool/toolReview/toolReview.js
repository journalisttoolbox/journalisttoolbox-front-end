'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('tool.review', {
        url: '/review',
        templateUrl: 'app/tool/toolReview/toolReview.html',
        controller: 'ToolReviewCtrl'
      });
  }]);