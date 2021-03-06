(function() {
  'use strict';

  angular.module('jtApp')
    .directive('homepageLists', homepageLists);


  function homepageLists(){
    var directive = {
      restrict: 'E',
      templateUrl: 'app/main/homepageLists/homepageLists.html',
      controller: ['$scope', 'ToolList', function($scope,ToolList){
        ToolList.getFeatured(function(data) {
          $scope.featuredLists = data.featured;
        }, function(err) {
            $scope.errors.toolList = err.data.error;
        });
      }]
        ,
      bindToController: true
    };

    return directive;

}

})();