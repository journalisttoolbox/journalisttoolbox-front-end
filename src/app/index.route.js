(function() {
  'use strict';

  angular
    .module('journalisttoolboxFrontend')
    .config(['$stateProvider', '$urlRouterProvider', routeConfig]);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    var home = {
      name: 'home',
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl',
      controllerAs:'vm'
    };

    var explore = {
      name: 'explore',
      url: '/explore/:cat',
      templateUrl: 'app/explore/explore.html',
      controller: 'ExploreCtrl'
    };

    var tool = {
      name: 'tool',
      url: '/tool/:id',
      templateUrl: 'app/tool/tool.html',
      controller: 'ToolCtrl'      
    };

    var create = {
      name: 'create',
      url: '/create',
      templateUrl: 'app/create/create.html',
      controller: 'CreateCtrl'
    };

    var admin = {
      name: 'admin',
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminCtrl'
    };

    $stateProvider.state(home);
    $stateProvider.state(explore);
    $stateProvider.state(tool);
    $stateProvider.state(create);
    $stateProvider.state(admin);

    $urlRouterProvider.otherwise('/');

  }

})();
