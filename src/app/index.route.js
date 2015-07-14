(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
        // controllerAs:'vm'
      })
      .state('app', {
        url: '/app/:id',
        templateUrl: 'app/app/app.html',
        controller: 'AppCtrl'
      })
      .state('tools', {
        url: '/tools/:category',
        templateUrl: 'app/tools/tools.html',
        controller: 'ToolsCtrl',
        controllerAs: 'tsCtrl'
      })
      .state('request', {
        url: '/request/:term',
        templateUrl: 'app/request/request.html',
        controller: 'RequestCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      })
      .state('interested', {
        url: '/interested',
        templateUrl: 'app/interested/interested.html',
        controller: 'InterestedCtrl'
      });

  }

})();
