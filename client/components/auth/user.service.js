'use strict';

angular.module('jtApp')
  .factory('User', ['$resource', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      addRemoveTool : {
        method: 'PUT',
        params: {
          controller: 'tool'
        }
      },
      addRemoveFavourites : {
        method: 'PUT',
        params: {
          controller: 'favourites'
        }
      },
      update: { 
        method : 'PUT', 
        params: { 
          id: '@id' 
        } 
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  }]);
