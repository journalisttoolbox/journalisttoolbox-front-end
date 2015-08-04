'use strict';

angular.module('jtApp')
  .factory('Tool', function ($resource) {
    return $resource('/api/tools/:id/:controller', { 
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
      voteTool: {
        method: 'PATCH',
        params: {
          id: '@toolID',
          controller: 'vote',
          vote: '@vote'
        }
      }
    });
  });