(function(){
  'use strict';

  angular.module('jtApp')
    .controller('CreateCtrl', ['$scope', '$http', '$stateParams', '$state', 'Tool', 'Auth', 'User', '$timeout', function ($scope, $http, $stateParams, $state, Tool, Auth, User, $timeout){

    $scope.currentUser = Auth.getCurrentUser;
    $scope.showMore = false;
    $scope.githubLoaderUrl = {};
    $scope.loadingGithub = false;

    $scope.tags = [];

    $scope.loadTags = function(query) {
                         var result = $http.get('api/tags?query=' + query);
                         console.log(result);
                         return result;

                      };

    $scope.showMoreClicked = function() {
      $scope.showMore = !$scope.showMore;
    }
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

    $scope.submitTool = function() {
      // Add the tool creator
      $scope.formData.owner = $scope.currentUser().email;
      $scope.toolName       = $scope.formData.name;
      if($scope.formData.categories) $scope.formData.categories = $scope.formData.categories.toString();
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
      obj.companies = obj.companies.toString();

      $scope.formData = obj;
    };

    $scope.hitGithubApi = function(owner, repo) {
      $scope.loadingGithub = true;
      $http.get('https://api.github.com/repos/'+owner+'/'+repo+'/'+'contents/toolbox.json').
        then(function(data) {
          $scope.decodeData(data.data.content);
          $scope.errors.githubError = false;
          $scope.loadingGithub = false;
        }, function(err) {
          $scope.errors.githubError = 'GitHub API error: ' + err;
        });
    };

    $scope.populateForm = function() {
      console.log($scope.githubLoaderUrl.url)
      if(!$scope.githubLoaderUrl) {

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

    $scope.categories = [
        {
          name: 'Maps',
          icon: 'map',
          link: 'maps'
        },
        {
          name: 'Videos',
          icon: 'video',
          link: 'videos'
        },
        {
          name: 'Images',
          icon: 'photo',
          link: 'images'
        },
        {
          name: 'Charts',
          icon: 'bar chart',
          link: 'charts'
        },
        {
          name: 'Audio',
          icon: 'sound',
          link: 'audio'
        },
        {
          name: 'Data Processing',
          icon: 'calculator',
          link: 'data-processing'
        },
        {
          name: 'Timelines',
          icon: 'time',
          link: 'timelines'
        },
        {
          name: 'Design',
          icon: 'paint brush',
          link: 'design'
        },
        {
          name: 'Text Editor',
          icon: 'write',
          link: 'text-editor'
        },
        {
          name: 'Research',
          icon: 'student',
          link: 'research'
        },
      ];

  }])

})();
