(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .factory('usersService', usersService);

    function usersService($resource) {
      // Users service resource
      usersService.usersResource = 
        $resource('http://localhost:3030/api/users/:id', {id: '@id'}, {
          // save: { method: 'POST', isArray: true }
        });

      return usersService;
    }
})();
