'use strict';

angular.module('jtApp')
  .controller('VerifyCtrl', ['$rootScope', '$scope', '$state', 'Auth', 'User', function ($rootScope, $scope, $state, Auth, User) {
    User.verifyUser({theString:'9dj9dj9dj'});
  }]);
