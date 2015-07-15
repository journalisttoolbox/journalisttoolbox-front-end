(function() {
	'use strict';

	angular
	    .module('journalisttoolboxFrontend')
	    .directive('jtExplore', jtExplore);

	function jtExplore(){
		var directive = {
	      restrict: 'E',
	      templateUrl: 'app/components/explore/explore.html',
	      controller: ExploreCtrl,
	      bindToController: true
	    };
		return directive;

	/** @ngInject */
	function ExploreCtrl($scope){
		$scope.categories = [
	      {
	        name: 'Maps',
	        icon: 'map',
	        color: 'blue',
	        link: 'maps'
	      },
	      {
	        name: 'Videos',
	        icon: 'video',
	        color: 'teal',
	        link: 'videos'
	      },
	      {
	        name: 'Images',
	        icon: 'photo',
	        color: 'pink',
	        link: 'images'
	      },
	      {
	        name: 'Charts',
	        icon: 'bar chart',
	        color: 'red',
	        link: 'charts'
	      },
	      {
	        name: 'Audio',
	        icon: 'sound',
	        color: 'green',
	        link: 'audio'
	      },
	      {
	        name: 'Data Processing',
	        icon: 'calculator',
	        color: 'orange',
	        link: 'data-processing'
	      },
	      {
	        name: 'Timelines',
	        icon: 'time',
	        color: 'yellow',
	        link: 'timelines'
	      },
	      {
	        name: 'Design',
	        icon: 'paint brush',
	        color: 'purple',
	        link: 'design'
	      },
	    ];
	}
}
})();