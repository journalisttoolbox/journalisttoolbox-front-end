'use strict';

angular.module('jtApp')
  .factory('User', function ($resource) {
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
