'use strict';

angular.module('jtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tool.review', {
        url: '/review',
        templateUrl: 'app/tool/toolReview/toolReview.html',
        controller: 'ToolReviewCtrl'
      });
  });