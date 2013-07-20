"use strict";angular.module("angularjsRundownApp",[]).config(["$routeProvider",function(a){a.when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl"}).when("/movie/:movie_id",{templateUrl:"views/movie_details.html",controller:"MovieDetailsCtrl"}).when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","$anchorScroll","$routeParams",function(a,b,c,d){a.$on("$routeChangeSuccess",function(){b.hash(d.scrollTo),c()})}]).run(["$rootScope",function(a){a.getStyle=function(){var b={};return a.backgroundImage&&(b.backgroundImage='url("'+a.backgroundImage+'");'),b}}]),angular.module("angularjsRundownApp").controller("MainCtrl",["$scope","rottenTomatoesApi",function(){}]),angular.module("angularjsRundownApp").controller("MovieDetailsCtrl",["$rootScope","$scope","$routeParams","rottenTomatoesApi",function(a,b,c,d){b.movie=d.movieInfo(c.movie_id),b.movie.then(function(b){a.backgroundImage=b.posters.detailed})}]),angular.module("angularjsRundownApp").factory("rottenTomatoesApi",["$http","$q",function(a,b){var c=function(a){return a+"?_="+(new Date).getTime()};return{topRentals:function(){var d=b.defer();return a.get(c("api/public/v1.0/lists/dvds/top_rentals.json")).success(function(a){d.resolve(a)}),d.promise},movieInfo:function(d){var e=b.defer();return a.get(c("api/public/v1.0/movies/"+d+".json")).success(function(a){e.resolve(a)}),e.promise},movieClips:function(d){var e=b.defer();return a.get(c("api/public/v1.0/movies/"+d+"/clips.json")).success(function(a){e.resolve(a)}),e.promise},similar:function(d){var e=b.defer();return a.get(c("api/public/v1.0/movies/"+d+"/similar.json")).success(function(a){e.resolve(a)}),e.promise},upcoming:function(){var d=b.defer();return a.get(c("api/public/v1.0/lists/movies/upcoming.json")).success(function(a){d.resolve(a)}),d.promise},search:function(d,e,f){f=f||30,e=e||1;var g=b.defer();return a({method:"GET",url:c("api/public/v1.0/movies.json"),params:{q:d,page:e,page_limit:f}}).success(function(a){g.resolve(a)}),g.promise}}}]),angular.module("angularjsRundownApp").controller("rdTopRentalsCtrl",["$scope","rottenTomatoesApi",function(a,b){a.topRentals=b.topRentals()}]).directive("rdTopRentals",function(){return{templateUrl:"/views/directives/rd_top_rentals.html",restrict:"E",replace:!0,controller:"rdTopRentalsCtrl",scope:!0}}),angular.module("angularjsRundownApp").directive("rdBackgroundImage",function(){return{restrict:"A",link:function(a,b,c){a.$watch(c.rdBackgroundImage,function(a){if(a){var c=new Image;c.onload=function(){b.css("background-image",'url("'+a+'")')},c.src=a}})}}}),angular.module("angularjsRundownApp").directive("rdMovieScore",function(){return{templateUrl:"/views/directives/rd_movie_score.html",restrict:"E",replace:!0,scope:{movie:"="},link:function(){}}}),angular.module("angularjsRundownApp").filter("time",function(){return function(a){var b=parseInt(a/60,10),c=a-60*b;return b+"h "+c+"m"}}),angular.module("angularjsRundownApp").filter("list",function(){var a=function(a){return function(b){return b[a]}};return function(b,c){return b?(c&&(b=b.map(a(c))),b.join(", ")):void 0}}),angular.module("angularjsRundownApp").directive("rdSearchForm",["$location",function(a){var b=function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}};return{restrict:"A",require:"^form",link:function(c){c.$watch("q",b(function(b){b&&(a.path("search"),a.search("q",b),c.$apply())},300))}}}]),angular.module("angularjsRundownApp").controller("SearchCtrl",["rottenTomatoesApi","$scope","$routeParams",function(a,b,c){b.query=c.q,b.results=a.search(c.q),b.results.then(function(a){b.total=a.total}),b.paginate=function(d){b.results=a.search(c.q,d)}}]),angular.module("angularjsRundownApp").directive("rdMovieCard",[function(){return{templateUrl:"/views/directives/rd_movie_card.html",replace:!0,restrict:"A",scope:{movie:"="},link:function(a,b){b.addClass("movie-card")}}}]),angular.module("angularjsRundownApp").controller("rdPaginationCtrl",["$scope","$element",function(a,b){a.hasPrev=!1,a.hasNext=!1,a.pageSize=30,a.currentPage=1;var c=this;a.prevPage=function(){a.currentPage--,c.processPagination(),a.onPaginate(a)},a.nextPage=function(){a.currentPage++,c.processPagination(),a.onPaginate(a)},this.initializePaginationWith=function(b){a.itemCount=b,this.processPagination()},this.processPagination=function(){console.log("this.currentPage",a.currentPage),a.hasNext=a.itemCount>a.pageSize*a.currentPage,a.hasPrev=a.currentPage>1,a.itemCount<a.pageSize*a.currentPage?b.addClass("hide"):b.removeClass("hide")}}]).directive("rdPagination",["$parse",function(a){return{templateUrl:"/views/directives/rd_pagination.html",restrict:"E",replace:!0,controller:"rdPaginationCtrl",scope:!0,link:function(b,c,d,e){b.onPaginate=a(d.onPaginate),b.$watch(d.rdPaginationTotal,function(a){a&&e.initializePaginationWith(a)})}}}]),angular.module("angularjsRundownApp").directive("rdLoading",function(){var a={lines:13,length:2,width:2,radius:4,corners:1,rotate:0,direction:1,color:"#FFF",speed:1,trail:60,shadow:!1,hwaccel:!0,className:"spinner",zIndex:2e9,top:"0",left:"0"};return{template:'<div class="rd-loading"></div>',replace:!0,restrict:"E",link:function(b,c,d){d.options=d.options||{};var e=angular.extend({},a,d.options),f=new Spinner(e).spin(c[0]);c.bind("$destroy",function(){f.stop()})}}}),angular.module("angularjsRundownApp").controller("rdMovieClipsCtrl",["$scope","rottenTomatoesApi",function(a,b){this.loadMovieClips=function(){a.data=b.movieClips(a.movie.id),a.limit=5,a.seeAll=function(){a.limit=90}}}]).directive("rdMovieClips",function(){return{templateUrl:"/views/directives/rd_movie_clips.html",restrict:"E",controller:"rdMovieClipsCtrl",scope:{movie:"="},link:function(a,b,c,d){a.$watch("movie",function(a){a&&d.loadMovieClips()})}}}),angular.module("angularjsRundownApp").directive("rdMovieRating",function(){return{templateUrl:"/views/directives/rd_movie_rating.html",replace:!0,restrict:"E",scope:{movie:"="},link:function(a){console.log(a.movie)}}}),angular.module("angularjsRundownApp").controller("rdMovieSimilarCtrl",["$scope","rottenTomatoesApi",function(a,b){this.loadMovieClips=function(){a.data=b.similar(a.movie.id)}}]).directive("rdMovieSimilar",function(){return{templateUrl:"/views/directives/rd_movie_similar.html",restrict:"E",controller:"rdMovieSimilarCtrl",scope:{movie:"="},link:function(a,b,c,d){a.$watch("movie",function(a){a&&d.loadMovieClips()})}}}),angular.module("angularjsRundownApp").controller("rdUpcomingMoviesCtrl",["$scope","rottenTomatoesApi",function(a,b){a.upcoming=b.upcoming()}]).directive("rdUpcomingMovies",function(){return{templateUrl:"/views/directives/rd_upcoming_movies.html",restrict:"E",replace:!0,controller:"rdUpcomingMoviesCtrl",scope:!0}});