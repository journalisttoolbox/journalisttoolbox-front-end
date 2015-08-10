'use strict';

angular.module('jtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list/:id',
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  });