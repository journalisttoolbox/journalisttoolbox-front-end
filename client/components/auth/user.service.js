'use strict';

angular.module('jtApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      verifyUser: {
        method: 'PUT',
        params: {
          id: 'verify',
          theString: '@theString'
        }
      },
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
  });
