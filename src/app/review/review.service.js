(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .factory('reviewService', reviewService);

    function reviewService($state, $resource) {
      reviewService.reviewResource =
        $resource('http://localhost:3030/api/reviews/:id', { id: '@id' });

      return reviewService;
    }

})();