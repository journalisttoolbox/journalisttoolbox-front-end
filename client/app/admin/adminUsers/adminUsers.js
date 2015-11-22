'use strict';

angular.module('jtApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/adminUsers/adminUsers.html',
        controller: 'AdminUsersCtrl'
      });
  }]);