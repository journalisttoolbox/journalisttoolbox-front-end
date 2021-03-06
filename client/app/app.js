'use strict';

angular.module('jtApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTagsInput',
  'btford.socket-io',
  'ui.router'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token') && config.url.indexOf('github.com') === -1) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to signup
      responseError: function(response) {
        if(response.status === 401) {
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])

  .run(['$rootScope', '$location', 'Auth', '$document', function ($rootScope, $location, Auth, $document) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });

    // Auto-scroll to the top of windows on route change
    $rootScope.$on('$stateChangeSuccess', function() {
      $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
    });
  }]);
