'use strict';

angular.module('journalisttoolboxFrontend')
  .factory('Auth', function Auth($location, $cookies, $rootScope, Session, User) {
    $rootScope.currentUser = $cookies.get('user') || null;
    console.log($rootScope.currentUser);
    $cookies.remove('user');

    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          email: user.email,
          password: user.password
        }, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      // logout: function(callback) {
      //   var cb = callback || angular.noop;
      //   Session.delete(function(res) {
      //       $rootScope.currentUser = null;
      //       return cb();
      //     },
      //     function(err) {
      //       return cb(err.data);
      //     });
      // },

      createUser: function(userInfo, callback) {
        var cb = callback || angular.noop;
        User.save(userInfo,
          function(user){
            $rootScope.currentUser = user;
            return cb();
          },
          function(err){
            console.log("error creating user: " + err.data);
          });
      },

      currentUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
        });
      }

      // changePassword: function(email, oldPassword, newPassword, callback) {
      //   var cb = callback || angular.noop;
      //   User.update({
      //     email: email,
      //     oldPassword: oldPassword,
      //     newPassword: newPassword
      //   }, function(user) {
      //       console.log('password changed');
      //       return cb();
      //   }, function(err) {
      //       return cb(err.data);
      //   });
      // },

      // removeUser: function(email, password, callback) {
      //   var cb = callback || angular.noop;
      //   User.delete({
      //     email: email,
      //     password: password
      //   }, function(user) {
      //       console.log(user + 'removed');
      //       return cb();
      //   }, function(err) {
      //       return cb(err.data);
      //   });
      // }
    };
  })