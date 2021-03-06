'use strict';

angular.module('jtApp')
  .factory('Tool', ['$resource', function ($resource) {
    return $resource('/api/tools/:id/:controller', { 
      id: '@_id'
    }, 
    {
      get: {
        isArray: true
      },
      save: { 
        method: 'POST'
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
      },
      postReview: {
        method: 'PUT',
        params: {
          id: '@toolID',
          controller: 'review',
          review: '@review'
        }
      }
    });
  }]);