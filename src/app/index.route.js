(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs:'vm'
      })
      .state('explore', {
        url: 'explore/:cat',
        templateUrl: 'app/explore/explore.html',
        controller: 'ExploreCtrl'
      })
      .state('tool', {
        url: 'tool/:id',
        templateUrl: 'app/tool/tool.html',
        controller: 'ToolCtrl'
      });
     
    // $urlRouterProvider.otherwise('/');
  }

})();
