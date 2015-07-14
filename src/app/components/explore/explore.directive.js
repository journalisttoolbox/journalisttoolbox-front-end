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
	        image: 'http://www.placehold.it/140x140',
	        icon: 'map',
	        color: 'blue',
	        link: 'maps',
	      },
	      {
	        name: 'Videos',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'video',
	        color: 'teal',
	        link: 'videos',
	      },
	      {
	        name: 'Images',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'photo',
	        color: 'pink',
	        link: 'images',
	      },
	      {
	        name: 'Charts',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'bar chart',
	        color: 'red',
	        link: 'charts',
	      },
	      {
	        name: 'Long Reads',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'newspaper',
	        color: 'green',
	        link: 'longreads',
	      },
	      {
	        name: 'Quizzes',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'question',
	        color: 'orange',
	        link: 'quizzes',
	      },
	      {
	        name: 'Timelines',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'time',
	        color: 'yellow',
	        link: 'timelines',
	      },
	      {
	        name: 'Discovery',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'search',
	        color: 'purple',
	        link: 'discovery',
	      },
	    ];
	}
}
})()