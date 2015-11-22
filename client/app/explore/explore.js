'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('explore', {
        url: '/explore/:cat',
        templateUrl: 'app/explore/explore.html',
        controller: 'ExploreCtrl'
      });
  }]);