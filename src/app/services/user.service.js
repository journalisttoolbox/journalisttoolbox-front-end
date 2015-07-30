(function(){
	'use strict';

	angular
		.module('journalisttoolboxFrontend')
		.factory('User', ['$resource', function($resource){
			return $resource('http://localhost:3030/api/users/:id', {id: '@id'}, {
        'update': { method : 'PUT', params: { id: '@id' } }
      });
		}]);

})();