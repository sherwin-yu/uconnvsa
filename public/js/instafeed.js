(function(){

	angular.module('instafeed',[])

	.factory('instagramAPI', ['$http', function($http) {
		return {
			fetchPhotos : function(callback) {
				var accessToken ="30345130.1677ed0.4a8ab87313064cd9923a8418f0127690";
				var endpoint ='https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken;
				endpoint += '&callback=JSON_CALLBACK';
				$http.jsonp(endpoint).success(function(response) {
					callback(response.data);
				});
			}
		};
	}]);




})();
