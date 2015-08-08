(function(){
  'use strict';

  angular.module('jtApp')
    .controller('CreateCtrl', CreateCtrl);

  function CreateCtrl($scope, $http, $stateParams, $state, Tool, Auth, User, $timeout) {

    $scope.currentUser = Auth.getCurrentUser;
    $scope.toolMessage = false;

    $scope.hideToolMessage = function() {
      $scope.toolMessage = false;
      $state.go('tool', { id: $scope.toolID }, {reload: true});
    };

    $scope.showToolMessage = function() {
      $scope.toolMessage = true;

        // Hide the tool message automatically
        $timeout(function() {
          if($scope.toolMessage) {
            $scope.hideToolMessage();
          }
        }, 5000);
    };

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
      $scope.formData.owner = $scope.currentUser().email;
      $scope.toolName       = $scope.formData.name;

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
          }, function(err) {
            console.log(err);
          });

          $scope.toolID = tool._id;
          $scope.showToolMessage();

        }, function(error) {
          console.log('error ' + error);
        });
    };

  }

})();
