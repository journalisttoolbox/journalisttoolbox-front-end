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
	        name: 'Audio',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'sound',
	        color: 'green',
	        link: 'audio',
	      },
	      {
	        name: 'Data Processing',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'calculator',
	        color: 'orange',
	        link: 'data-processing',
	      },
	      {
	        name: 'Timelines',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'time',
	        color: 'yellow',
	        link: 'timelines',
	      },
	      {
	        name: 'Design',
	        image: 'http://www.placehold.it/140x140',
	        icon: 'paint brush',
	        color: 'purple',
	        link: 'design',
	      },
	    ];
	}
}
})()