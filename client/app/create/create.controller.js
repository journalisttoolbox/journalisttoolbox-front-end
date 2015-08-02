(function(){
  'use strict';

  angular.module('jtApp')
    .controller('CreateCtrl', CreateCtrl);

  function CreateCtrl($scope, $http, $stateParams, $state, Tool, Auth, User) {

    // Check is user is logged in
    if (Auth.isLoggedIn()) {
      $scope.currentUser = User.get();
    } else {
      $scope.currentUser = false;
    }

    // Add the 'http://' if not already present
    $scope.prependHttp = function(url) {
      if(url.indexOf('http') < 0) {
        var prefixedUrl = 'http://' + url;
        return prefixedUrl;
      } else {
        return url;
      }
    };

    $scope.submitTool = function() {
      // Add the tool creator
      $scope.formData.owner    = $scope.currentUser._id;
      $scope.toolName          = $scope.formData.name;

      // Sort out links
      $scope.formData.git      = $scope.prependHttp($scope.formData.git);
      $scope.formData.home     = $scope.prependHttp($scope.formData.home);
      $scope.formData.download = $scope.prependHttp($scope.formData.download);

      Tool.save($scope.formData)
        .$promise.then(function() {

          $('.ui.basic.modal.toolCreated').modal();
          $('.ui.basic.modal.toolCreated').modal('show');

          $state.go('main');
          window.scroll(0, 0); 
        }, function(error) {
          console.log('error ' + error);
        });
    };

  }

})();
