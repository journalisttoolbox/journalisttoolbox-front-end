'use strict';

angular.module('jtApp')
  .factory('ToolList', ['$resource', function ($resource) {
    return $resource('/api/toolLists/:id/:controller', { 
      id: '@_id'
    }, 
    {
      get: {
        isArray: true,
      },
      save: { 
        method: 'POST',
        params: {
          userID: '@userID',
          toolListName: '@toolListName',
          description: '@description'
        }
      },
      update: {
        method : 'PUT', 
        params: {
          id: '@id',
          toolToAdd: '@toolToAdd',
          toolToRemove: '@toolToRemove' 
        }
      },
      getFeatured: {
        method: 'GET',
        params: {
          isArray: true,
          id: 'featured'
        }
      }
    });
  }]);