'use strict';

angular.module('angularjsRundownApp')
  .factory('rottenTomatoesApi', ['$http', '$q', function($http, $q) {
    // Private methods
    var getUrl = function (url) {
      return url + '?_=' + new Date().getTime();
    };

    // Public API here
    return {
      topRentals: function() {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/lists/dvds/top_rentals.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      }
    };
  }]);