'use strict';

angular.module('jtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify',
        templateUrl: 'app/main/verify-account/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });