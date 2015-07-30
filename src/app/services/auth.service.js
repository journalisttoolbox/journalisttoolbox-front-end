(function() {
'use strict';

angular.module('journalisttoolboxFrontend')
  .factory('Auth', function Auth($location, $cookies, Session, User, $rootScope) {

    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          email: user.email,
          password: user.password
        }, function(user) {
            // Store the current user in Browser's cookie.
            $cookies.putObject('user', user);
            $rootScope.loggedInUser = $cookies.getObject('user');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function() {
            //Remove cookie and set logged in user to null;
            $cookies.remove('user');
            $rootScope.loggedInUser = null;
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      createUser: function(userInfo, callback) {
        var cb = callback || angular.noop;
        User.save(userInfo,
          function(user){
            // Store the current user in Browser's cookie.
            $cookies.putObject('user', user);
            $rootScope.loggedInUser = $cookies.getObject('user');
            return cb();
          },
          function(err){
            console.log("error creating user: " + err.data);
          });
      },

      currentUser: function() {
        Session.get(function(user) {
          $cookies.putObject('user', user);
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
  });
})();