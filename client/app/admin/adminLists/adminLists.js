'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('admin.lists', {
        url: '/lists',
        templateUrl: 'app/admin/adminLists/adminLists.html',
        controller: 'AdminListsCtrl'
      });
  }]);