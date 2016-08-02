'use strict';

angular.module('jtApp')
  .controller('VerifyCtrl', ['$stateParams', '$rootScope', '$scope', '$state', 'Auth', 'User', function ($stateParams, $rootScope, $scope, $state, Auth, User) {
    
    $scope.uid = {uid:$stateParams.uid};

  	User.verifyUser($scope.uid, function(){
  		$scope.foundUser = true;
  	}, function(){
  		$scope.foundUser = false;
  	});
    
  }]);
