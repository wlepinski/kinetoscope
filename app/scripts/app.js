'use strict';

angular.module('angularjsRundownApp', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/movie/:movie_id', {
          templateUrl: 'views/movie_details.html',
          controller: 'MovieDetailsCtrl'
        })
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
