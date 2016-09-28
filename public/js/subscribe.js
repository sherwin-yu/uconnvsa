(function(){

	angular.module('subscribe',[])




  // Stub of angular service to access org apis
  // services are good as they let you reuse functionality between different
  // controllers and keep scope between different controllers
  // you should have a service for each different api you consume
  .service('subscribeService', ['$http', function($http){

		/*
		* POST Subscribe Call
		*/

		this.subscribe = function(subscriber, callback){
			$http.post('/subscribe', subscriber)
			.then( function(res){
				callback(res.data, false);
			}, function(res){
				//failure
				var msg = res.statusText || "There was an error with subscribing";
				callback(msg, true);
			});
		};



  }]);


})();
