'use strict';

angular.module('jtApp')
  .factory('Tool', function ($resource) {
    return $resource('/api/tools/:id/:user', { 
      id: '@_id' 
    }, 
    {
      save: { 
        method: 'POST', 
        isArray: true 
      },
      update: {
        method : 'PUT', 
        params: {
          id: '@id' 
        }
      },
      getUsersTools: {
        method: 'GET',
        params: {
          id: 'user',
          isArray: true
        }
      }
    });
  });