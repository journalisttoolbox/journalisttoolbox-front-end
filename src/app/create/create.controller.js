(function(){
	'use strict';
	
	angular
	.module('journalisttoolboxFrontend')
	.controller('CreateCtrl', CreateController);

	/** @ngInject */
	function CreateController($scope, $http, $stateParams, $state, createTool) {

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
      // Sort out links
      $scope.formData.git      = $scope.prependHttp($scope.formData.git);
      $scope.formData.home     = $scope.prependHttp($scope.formData.home);
      $scope.formData.download = $scope.prependHttp($scope.formData.download);

      createTool.post($scope.formData);
		};

    $scope.test = false;
	}
})();
