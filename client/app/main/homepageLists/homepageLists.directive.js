(function() {
  'use strict';

  angular.module('jtApp')
    .directive('homepageLists', homepageLists);


  function homepageLists(){
    var directive = {
      restrict: 'E',
      templateUrl: '/app/main/homepageLists/homepageLists.html',
      controller: HomepageListsCtrl,
      bindToController: true
    };

    return directive;

  function HomepageListsCtrl($scope, ToolList) {
    ToolList.getFeatured(function(data) {
        $scope.featuredLists = data.featured;
      }, function(err) {
        $scope.errors.toolList = err.data.error;
    });

  }
}

})();