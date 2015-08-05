(function(){
  'use strict';

  angular.module('jtApp')
    .controller('CreateCtrl', CreateCtrl);

  function CreateCtrl($scope, $http, $stateParams, $state, Tool, Auth, User, $location) {

    $scope.currentUser = Auth.getCurrentUser;

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
      $scope.formData.owner    = $scope.currentUser().email;
      $scope.toolName          = $scope.formData.name;

      // Sort out links
      $scope.formData.github_url   = $scope.prependHttp($scope.formData.github_url);
      $scope.formData.home_url     = $scope.prependHttp($scope.formData.home_url);
      $scope.formData.download_url = $scope.prependHttp($scope.formData.download_url);

      Tool.save($scope.formData)
        .$promise.then(function(tool) {

          // Once the tool has been created, add this tool's ID to the user object 
          User.addRemoveTool({ id: $scope.currentUser()._id }, {
            toolID: tool._id,
            addTool: true
          }, function(user) {
            console.log(user);
          }, function(err) {
            console.log(err);
          });

          $('.ui.basic.modal.toolCreated').modal();
          $('.ui.basic.modal.toolCreated').modal('show');

          $state.go('main', {}, {reload: true});
          window.scroll(0, 0); 
        }, function(error) {
          console.log('error ' + error);
        });
    };

  }

})();
