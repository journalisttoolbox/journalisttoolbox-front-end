'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list/:id',
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  }]);