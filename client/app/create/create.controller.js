(function(){
  'use strict';

  angular.module('jtApp')
    .controller('CreateCtrl', CreateCtrl);

  function CreateCtrl($scope, $http, $stateParams, $state, Tool, Auth, User, $timeout) {

    $scope.currentUser = Auth.getCurrentUser;
    $scope.toolMessage = false;
    $scope.githubLoaderUrl = {};
    $scope.errors = {};

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

      var gh       = $scope.formData.github_url;
      var home     = $scope.formData.home_url;
      var download = $scope.formData.download_url;
      var logo     = $scope.formData.logo_url;

      // Sort out links
      if(logo) { $scope.formData.logo_url         = $scope.prependHttp(logo); }
      if(home) { $scope.formData.home_url         = $scope.prependHttp(home); }
      if(download) { $scope.formData.download_url = $scope.prependHttp(download); }
      if(gh) { $scope.formData.github_url         = $scope.prependHttp(gh); }

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

    $scope.decodeData = function(encString) {
      encString = encString.replace(/\s/g, '');
      var decoded = atob(encString);
      var obj = JSON.parse(decoded);

      $scope.formData = obj;
    };

    $scope.hitGithubApi = function(owner, repo) {
      $http.get('https://api.github.com/repos/'+owner+'/'+repo+'/'+'contents/toolbox.json').
        then(function(data) {
          $scope.decodeData(data.data.content);
          $scope.errors.githubError = false;
        }, function(err) {
          $scope.errors.githubError = 'GitHub API error: ' + err;
        });
    };

    $scope.populateForm = function() {
      if(!$scope.githubLoaderUrl.url) {
        $scope.errors.githubError = 'Invalid entry';
        return;
      }

      var url = $scope.githubLoaderUrl.url;
      if (url.indexOf('github.com') > -1) {
        var details = url.split('github.com/')[1];
        var owner = details.split('/')[0];
        var repo = details.split('/')[1];

        $scope.hitGithubApi(owner, repo);
        return;
      }
      $scope.errors.githubError = 'Invalid GitHub url';
    };

  }

})();
