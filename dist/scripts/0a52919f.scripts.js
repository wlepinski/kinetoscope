"use strict";angular.module("angularjsRundownApp",["ngCookies"]).constant("parseApplicationId","4kdi7WYXH9y20Lsb3EfYMLVytOttBFwjTpPcpTrO").constant("parseRestApiKey","1l8kAcGnsjceGBGUTZ951SgtxpTdjRZPI1On5YWM").constant("facebookAppId","177530099095061").constant("facebookPermissions",["email","user_likes","publish_actions"]).config(["$httpProvider",function(a){a.interceptors.push("authenticationHttpInterceptor"),a.interceptors.push("extractResultsHttpInterceptor")}]).config(["$routeProvider",function(a){a.when("/search",{templateUrl:"views/search.html",controller:"SearchCtrl",reloadOnSearch:!1}).when("/movie/:movieId",{templateUrl:"views/movie_details.html",controller:"MovieDetailsCtrl"}).when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$log","$cookieStore","facebookAppId","appSession",function(a,b,c,d,e){window.fbAsyncInit=function(){FB.init({appId:d,channelUrl:"//local.kinetoscope.herokuapp.com/channel.html",status:c.get("currentUser")?!0:!1,xfbml:!0}),FB.Event.subscribe("auth.authResponseChange",function(c){b.debug("Facebook.authResponseChange event fired with %o",c),a.$apply(function(){e.setCurrentUser(c)})})}}]),angular.module("angularjsRundownApp").controller("MainCtrl",["$scope","rottenTomatoesApi",function(a,b){a.upcoming=b.upcoming(),a.newReleases=b.newReleases(),a.currentReleases=b.currentReleases()}]),angular.module("angularjsRundownApp").controller("MovieDetailsCtrl",["$rootScope","$scope","$routeParams","rottenTomatoesApi","parseApi","facebookApi",function(a,b,c,d,e,f){var g=d.movieInfo(c.movieId);g.then(function(c){a.movieSelected=b.movie=c,c.favorited=e.isMovieFavorited(c)}),b.toggleMovieFavorite=function(){b.movie.favorited&&f.favoriteMovie(b.movie),e.toggleFavoriteMovie(b.movie)},g.then(function(a){ga("send","event","movie","details",a.title)})}]),angular.module("angularjsRundownApp").controller("SearchCtrl",["rottenTomatoesApi","$scope","$rootScope","$routeParams",function(a,b,c,d){c.$on("$routeUpdate",function(){e()});var e=function(){c.query=d.q,b.results=a.search(b.query),b.results.then(function(a){b.total=a.total,ga("send","event","movie","search",b.query)})};e(),b.paginate=function(c){b.results=a.search(b.query,c)}}]),angular.module("angularjsRundownApp").controller("AccountInfoCtrl",["$scope","facebookPermissions","appSession",function(a,b,c){a.login=function(){FB.login(angular.noop,{scope:b.join(",")})},a.logout=function(){c.setCurrentUser(null)}}]),angular.module("angularjsRundownApp").controller("rdTopRentalsCtrl",["$scope","rottenTomatoesApi",function(a,b){a.topRentals=b.topRentals()}]).directive("rdTopRentals",function(){return{templateUrl:"views/directives/rd_top_rentals.html",restrict:"E",replace:!0,controller:"rdTopRentalsCtrl",scope:!0}}),angular.module("angularjsRundownApp").directive("rdBackgroundImage",function(){return{restrict:"A",link:function(a,b,c){a.$watch(c.rdBackgroundImage,function(a){if(a){var c=new Image;c.onload=function(){b.css("background-image",'url("'+a+'")')},c.src=a}})}}}),angular.module("angularjsRundownApp").directive("rdSearchForm",["$rootScope","$location","$routeParams",function(a,b,c){var d=function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}};return{restrict:"A",require:"^form",link:function(a){c.q&&(a.q=c.q),a.$watch("query",d(function(c){c&&(b.path("search"),b.search("q",c),a.$apply())},300))}}}]),angular.module("angularjsRundownApp").directive("rdMovieScore",function(){return{templateUrl:"/views/directives/rd_movie_score.html",restrict:"E",replace:!0,scope:{movie:"="}}}),angular.module("angularjsRundownApp").directive("rdMovieCard",[function(){return{templateUrl:"views/directives/rd_movie_card.html",replace:!0,restrict:"A",scope:{movie:"="}}}]),angular.module("angularjsRundownApp").controller("rdPaginationCtrl",["$scope","$element",function(a){a.hasPrev=!1,a.hasNext=!1,a.pageSize=30,a.currentPage=1;var b=this;a.prevPage=function(){a.currentPage--,b.processPagination(),a.onPaginate(a)},a.nextPage=function(){a.currentPage++,b.processPagination(),a.onPaginate(a)},this.initializePaginationWith=function(b){a.itemCount=b,this.processPagination()},this.processPagination=function(){a.hasNext=a.itemCount>a.pageSize*a.currentPage,a.hasPrev=a.currentPage>1}}]).directive("rdPagination",["$parse",function(){return{templateUrl:"/views/directives/rd_pagination.html",restrict:"E",replace:!0,controller:"rdPaginationCtrl",scope:{onPaginate:"&",itemCount:"=itemCount"},link:function(a,b,c,d){a.$watch("itemCount",function(c){console.log(c),c&&(d.initializePaginationWith(c),c<a.pageSize*a.currentPage?b.addClass("hide"):b.removeClass("hide"))})}}}]),angular.module("angularjsRundownApp").directive("rdLoading",["$parse",function(a){var b={"default":{lines:11,length:0,width:2,radius:5,corners:0,rotate:6,direction:1,color:"#FFF",speed:1,trail:60,shadow:!1,hwaccel:!0,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},big:{lines:9,length:0,width:5,radius:11,corners:1,rotate:6,direction:1,color:"#FFF",speed:1,trail:100,shadow:!1,hwaccel:!0,className:"spinner",zIndex:2e9,top:"auto",left:"auto"}};return{template:'<div class="rd-loading"></div>',replace:!0,restrict:"E",link:function(c,d,e){var f=e.size||"default",g=b[f];e.options=a(e.options)()||{};var h=angular.extend({},g,e.options),i=new Spinner(h).spin(d[0]);d.bind("$destroy",function(){i.stop()})}}}]),angular.module("angularjsRundownApp").controller("rdMovieClipsCtrl",["$scope","rottenTomatoesApi",function(a,b){this.loadMovieClips=function(){a.data=b.movieClips(a.movie.id),a.limit=5,a.seeAll=function(){a.limit=90}}}]).directive("rdMovieClips",function(){return{templateUrl:"/views/directives/rd_movie_clips.html",restrict:"E",controller:"rdMovieClipsCtrl",scope:{movie:"="},link:function(a,b,c,d){a.$watch("movie",function(a){a&&d.loadMovieClips()})}}}),angular.module("angularjsRundownApp").directive("rdMovieRating",function(){return{templateUrl:"/views/directives/rd_movie_rating.html",replace:!0,restrict:"E",scope:{movie:"="}}}),angular.module("angularjsRundownApp").controller("rdMovieSimilarCtrl",["$scope","rottenTomatoesApi",function(a,b){this.loadMovieClips=function(){a.data=b.similar(a.movie.id)}}]).directive("rdMovieSimilar",function(){return{templateUrl:"/views/directives/rd_movie_similar.html",restrict:"E",replace:!0,controller:"rdMovieSimilarCtrl",scope:{movie:"="},link:function(a,b,c,d){a.$watch("movie",function(a){a&&d.loadMovieClips()})}}}),angular.module("angularjsRundownApp").controller("rdUpcomingMoviesCtrl",["$scope","rottenTomatoesApi",function(a,b){a.upcoming=b.upcoming()}]).directive("rdUpcomingMovies",function(){return{templateUrl:"views/directives/rd_upcoming_movies.html",restrict:"E",replace:!0,controller:"rdUpcomingMoviesCtrl",scope:!0}}),angular.module("angularjsRundownApp").directive("rdColorThief",function(){return{restrict:"A",link:function(a,b,c){var d=new ColorThief;(c.rdColorThief||c.rdColorThiefProperty)&&a.$watch(c.rdColorThief,function(a,e,f){if(a){var g=new Image;g.onload=function(){var a=d.getColor(g);b.css("backgroundColor","rgb("+a[0]+","+a[1]+","+a[2]+")")};var h=f.$eval(c.rdColorThief+"."+c.rdColorThiefProperty);g.src="/image?url="+encodeURIComponent(h)}})}}}),angular.module("angularjsRundownApp").directive("rdMoviePallete",function(){return{restrict:"C",scope:{movie:"="},link:function(a,b){b=$(b[0]);for(var c=new ColorThief,d=null,e=0;9>e;e++)d=$("<span></span>"),b.append(d);var f=b.find("span");a.$watch("movie",function(a){if(a){var b=new Image;b.onload=function(){var a=c.getPalette(b),d=100/a.length,e=null;a.forEach(function(a,b){e=$(f.get(b)).css("backgroundColor","rgba("+a[0]+","+a[1]+","+a[2]+", 1)").css("width",d+"%")})},b.src="/image?url="+a.posters.thumbnail}})}}}),angular.module("angularjsRundownApp").filter("time",function(){return function(a){var b=parseInt(a/60,10),c=a-60*b;return b+"h "+c+"m"}}),angular.module("angularjsRundownApp").filter("list",function(){var a=function(a){return function(b){return b[a]}};return function(b,c){return b?(c&&(b=b.map(a(c))),b.join(", ")):void 0}}),angular.module("angularjsRundownApp").factory("rottenTomatoesApi",["$http","$q",function(a,b){return{topRentals:function(){var c=b.defer();return a.get("api/public/v1.0/lists/dvds/top_rentals.json").success(function(a){c.resolve(a)}),c.promise},movieInfo:function(c){var d=b.defer();return a.get("api/public/v1.0/movies/"+c+".json").success(function(a){d.resolve(a)}),d.promise},movieClips:function(c){var d=b.defer();return a.get("api/public/v1.0/movies/"+c+"/clips.json").success(function(a){d.resolve(a)}),d.promise},similar:function(c,d){d=d||5;var e=b.defer();return a({method:"GET",url:"api/public/v1.0/movies/"+c+"/similar.json",params:{limit:d}}).success(function(a){e.resolve(a)}),e.promise},upcoming:function(){var c=b.defer();return a.get("api/public/v1.0/lists/movies/upcoming.json").success(function(a){c.resolve(a)}),c.promise},search:function(c,d,e){e=e||30,d=d||1;var f=b.defer();return a({method:"GET",url:"api/public/v1.0/movies.json",params:{q:c,page:d,page_limit:e}}).success(function(a){f.resolve(a)}),f.promise},currentReleases:function(c,d,e){c=c||"us",e=e||30,d=d||1;var f=b.defer();return a({method:"GET",url:"api/public/v1.0/lists/dvds/current_releases.json",params:{country:c,page:d,page_limit:e}}).success(function(a){f.resolve(a)}),f.promise},newReleases:function(c,d,e){c=c||"us",e=e||30,d=d||1;var f=b.defer();return a({method:"GET",url:"api/public/v1.0/lists/dvds/new_releases.json",params:{country:c,page:d,page_limit:e}}).success(function(a){f.resolve(a)}),f.promise}}}]),angular.module("angularjsRundownApp").service("appSession",["$log","$q","$cookieStore","$rootScope","parseApi",function(a,b,c,d,e){d.appSession=this;var f=null;this.setCurrentUser=function(g){var h=b.defer();if(null===g)return f=null,c.remove("currentUser"),h.resolve(f);var i=new Date;return i.setTime(i.getTime()+g.authResponse.expiresIn),a.debug("Linking user on the Parse.com API."),e.linkUser({userId:g.authResponse.userID,accessToken:g.authResponse.accessToken,expirationDate:i.toISOString()}).then(function(b){a.debug("User linked. Calling /me on Facebook"),FB.api("/me",function(e){d.$apply(function(){a.debug("Facebook user fetched."),f=angular.extend(e,b),c.put("currentUser",f),h.resolve(f)})})},function(){a.error(arguments)}),h.promise},this.getCurrentUser=function(){return f}}]),angular.module("angularjsRundownApp").factory("authenticationHttpInterceptor",["$q","$rootScope","parseApplicationId","parseRestApiKey",function(a,b,c,d){return{request:function(e){e.headers["X-Parse-Application-Id"]=c,e.headers["X-Parse-REST-API-Key"]=d;var f=b.appSession.getCurrentUser();return f&&(e.headers["X-Parse-Session-Token"]=f.sessionToken,"POST"===e.method&&("ACL"in e.data||(e.data.ACL={}),e.data.ACL[f.objectId]={read:!0,write:!0})),e||a.when(e)}}}]),angular.module("angularjsRundownApp").factory("extractResultsHttpInterceptor",["$q",function(a){return{response:function(b){return angular.isObject(b.data)&&"results"in b.data&&(b.data=b.data.results),b||a.when(b)}}}]),angular.module("angularjsRundownApp").factory("parseApi",["$http","$q",function(a,b){var c=b.defer(),d=null;return{linkUser:function(e){var f=b.defer(),g=a({url:"https://api.parse.com/1/users",method:"POST",data:{authData:{facebook:{id:e.userId,access_token:e.accessToken,expiration_date:e.expirationDate}}}});return g.success(function(a){c.resolve(a),d=a,f.resolve.apply(this,arguments)}),g.error(function(){f.reject.apply(this,arguments)}),f.promise},isMovieFavorited:function(a){var d=b.defer();return c.promise.then(function(b){var c=-1!==b.favorite_movies.indexOf(a.id);d.resolve(c)}),d.promise},toggleFavoriteMovie:function(c){var e=c.favorited?"AddUnique":"Remove",f=d.objectId,g=b.defer();return a({url:"https://api.parse.com/1/users/"+f,method:"PUT",data:{favorite_movies:{__op:e,objects:[c.id]}}}).success(function(a){d.favorite_movies=a.favorite_movies}),g.promise}}}]),angular.module("angularjsRundownApp").directive("rdMovieScoreBar",function(){return{restrict:"A",link:function(a,b,c){var d=a.$eval(c.score),e=Math.round(255*d/100),f=Math.round(255*(100-d)/100),g=0;b.css("width",d+"%"),b.css("backgroundColor","rgba("+f+","+e+","+g+", 1)")}}}),angular.module("angularjsRundownApp").factory("facebookApi",["$q","facebookAppId",function(a){return{favoriteMovie:function(b){var c=a.defer();return FB.api("me/kinetoscope:favorite","post",{movie:"http://kinetoscope.herokuapp.com/#/movie/"+b.id},function(a){c.resolve(a)}),c.promise}}}]);