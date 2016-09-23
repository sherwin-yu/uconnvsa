(function(){

	angular.module('mail',[])




  // Stub of angular service to access org apis
  // services are good as they let you reuse functionality between different
  // controllers and keep scope between different controllers
  // you should have a service for each different api you consume
  .service('mailService', ['$http', function($http){

		/*
		* POST Mail Call
		*/

		this.sendMail = function(mail, callback){
			$http.post('/sendEmail', mail)
			.then( function(res){
				callback(res.data, false);
			}, function(res){
				//failure
				var msg = res.statusText || "There was an error sending your mail";
				callback(msg, true);
			});
		};



  }]);


})();
