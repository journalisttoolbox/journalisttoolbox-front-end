'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('verify-account', {
        url: '/verify-account',
        templateUrl: 'app/main/verify-account/verify-account.html',
      });
  }]);