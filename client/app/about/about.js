'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      });
  }]);