'use strict';

angular.module('jtApp')
  .factory('ToolList', function ($resource) {
    return $resource('/api/toolLists/:id/:controller', { 
      id: '@_id'
    }, 
    {
      get: {
        isArray: true
      },
      save: { 
        method: 'POST',
        params: {
          userID: '@userID',
          toolListName: '@toolListName'
        }
      },
      update: {
        method : 'PUT', 
        params: {
          id: '@id' 
        }
      }
    });
  });