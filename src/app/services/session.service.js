(function(){
	'use strict';
  
	angular
		.module('journalisttoolboxFrontend')
		.factory('Session', ['$resource', function($resource){
			return $resource('http://localhost:3030/api/session');
		}]);

})();
