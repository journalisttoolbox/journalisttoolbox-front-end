'use strict';

angular.module('jtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tool', {
        url: '/tool/:id',
        templateUrl: 'app/tool/tool.html',
        controller: 'ToolCtrl'
      });
  });