'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify/:uid',
        templateUrl: 'app/main/verify-account/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  }]);