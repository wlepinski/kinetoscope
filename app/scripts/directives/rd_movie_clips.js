'use strict';

angular.module('angularjsRundownApp')
  .controller('rdMovieClipsCtrl', ['$scope', 'rottenTomatoesApi', function($scope, rottenTomatoesApi){
    this.loadMovieClips = function() {
      $scope.data = rottenTomatoesApi.movieClips($scope.movie.id);
    };
  }])
  .directive('rdMovieClips', function () {
    return {
      templateUrl: '/views/directives/rd_movie_clips.html',
      restrict: 'E',
      controller: 'rdMovieClipsCtrl',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs, controller) {
        scope.$watch('movie', function (newValue, oldValue) {
          if (newValue) {
            controller.loadMovieClips();
          }
        });
      }
    };
  });