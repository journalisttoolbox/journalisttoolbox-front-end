'use strict';

angular.module('jtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.tools', {
        url: '/tools',
        templateUrl: 'app/admin/adminTools/adminTools.html',
        controller: 'AdminToolsCtrl'
      });
  });