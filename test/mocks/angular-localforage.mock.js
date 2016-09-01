/**
 * Angular Localforage mock.
 */

angular.module('angular-localforage.mock', [])
  .provider('$localForage', function() {
    this.$get = function($q) {
      var data = {};
      return {
        getItem: function(key) {
          var q = $q.defer();
          q.resolve(data[key]);
          return q.promise;
        },
        setItem: function(key, value) {
          var q = $q.defer();
          data[key] = value;
          q.resolve();
          return q.promise;
        },
        removeItem: function(key) {
          var q = $q.defer();
          delete data[key];
          q.resolve();
          return q.promise;
        }
      }
    }
  });
