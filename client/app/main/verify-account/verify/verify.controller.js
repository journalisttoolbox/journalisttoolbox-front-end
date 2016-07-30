'use strict';

angular.module('jtApp')
  .controller('VerifyCtrl', ['$stateParams', '$rootScope', '$scope', '$state', 'Auth', 'User', function ($stateParams, $rootScope, $scope, $state, Auth, User) {
    User.verifyUser({uid:$stateParams.uid});
  }]);
