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
  }
}
})();
