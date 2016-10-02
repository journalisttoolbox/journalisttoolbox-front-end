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
          link: 'maps',
          description:'Plot data, style layers & add interactivity to cartography projects. Tools for putting stories on the map.'
        },
        {
          name: 'Video',
          icon: 'video',
          link: 'videos',
          description: 'Shoot & edit footage on desktop or mobile. Tools for recording, editing and sharing video.'
        },
        {
          name: 'Visualisation',
          icon: 'bar chart',
          link: 'charts',
          description: 'Build your classic line, bar and pie charts or get a bit fancier. Tools for visualising data, with or without code.'
        },
        {
          name: 'Audio',
          icon: 'sound',
          link: 'audio',
          description: 'Capture sounds, edit recordings, & publish to audio-sharing platforms. Tools for radio, broadcast, podcast and beyond.'
        },
        {
          name: 'Data',
          icon: 'calculator',
          link: 'data-processing',
          description:'Scrape a website, create a database or query a large dataset. Tools for finding, storing and analysing data.'
        },
        {
          name: 'Social',
          icon: 'comments',
          link: 'social',
          description: 'Share images & video, verify user-generated content & build bots. Tools for engaging followers and publishing stories on social media. '
        },
        {
          name: 'Design',
          icon: 'paint brush',
          link: 'design',
          description: 'Create a color palette, add textures to graphics or copycat your favourite web fonts. Tools for styling your stories. '
        },
        {
          name: 'Discovery',
          icon: 'search',
          link: 'discovery',
          description: 'Search for news, automate alerts & find information for your next investigation. Tools for finding stories — whether you’re looking or not. '
        },
        {
          name: 'Multimedia',
          icon: 'play',
          link: 'multimedia',
          discovery: 'Combine audio, video, photography, text & graphics. Tools for building projects with multimedia components.'
        }
      ];
  }
}
})();
