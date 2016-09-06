(function() {
  'use strict';

  angular
    .module('jtApp')
    .directive('errSrc', errSrc);


  function errSrc(){
    var directive = {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
    return directive;
  }

  })();
