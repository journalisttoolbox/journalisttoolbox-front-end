(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
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
      .state('explore', {
        url: '/explore/:category',
        templateUrl: 'app/explore/explore.html',
        controller: 'ExploreCtrl'
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

    $urlRouterProvider.otherwise('/');

    $urlRouterProvider.otherwise('/');
  }

})();
