(function() {
  'use strict';

  angular
    .module('jtApp')
    .directive('jtGrid', jtGrid);

  function jtGrid(){
    var directive = {
      restrict: 'E',
      templateUrl: 'app/main/grid/grid.html',
      controller: ['$scope', GridCtrl],
      bindToController: true
    };

    return directive;

  function GridCtrl($scope){
    $scope.categories = [
        {
          name: 'Maps',
          icon: 'map',
          link: 'maps'
        },
        {
          name: 'Video',
          icon: 'video',
          link: 'videos'
        },
        {
          name: 'Style',
          icon: 'shopping bag',
          link: 'style'
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
          name: 'Data',
          icon: 'calculator',
          link: 'data-processing'
        },
        {
          name: 'Social',
          icon: 'comments',
          link: 'social'
        }
        // {
        //   name: 'Design',
        //   icon: 'paint brush',
        //   link: 'design'
        // },
        // {
        //   name: 'Text Editor',
        //   icon: 'write',
        //   link: 'text-editor'
        // },
        // {
        //   name: 'Research',
        //   icon: 'student',
        //   link: 'research'
        // },
      ];
  }
}
})();
