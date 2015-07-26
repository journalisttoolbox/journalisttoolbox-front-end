(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .directive('ngReallyClick', ngReallyClick);

  /** @ngInject */
  function ngReallyClick() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    };
  }

})();

