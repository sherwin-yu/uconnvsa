(function(){

	angular.module('vsa-footer',[])

  .directive('vsaFooter', function(){
    return {
          restrict: 'E',
          templateUrl: 'templates/vsa-footer.html',
					controllerAs: 'footerCtrl',
					controller: ['$scope', 'subscribeService', function ($scope, subscribeService) {
				 		var that = this;
						//mail subscriptions
						that.subscribe = function(subscriber){
							var subscriberBody = {
								email_address: subscriber,
								status: "subscribed"
							};
							subscribeService.subscribe(subscriberBody, function(data){
								console.log('subscribe', data);
								$scope.subscriber ={};
								$scope.mailingListForm.$setPristine();
								if(data.title === 'Member Exists'){
									swal({
										title: 'Error!',
										text: subscriberBody.email_address + ' is already subscribed',
										type: 'error',
										confirmButtonText: 'OK'
									})
								} else {
									//new subscriber
									swal({
										title: 'Success!',
										text: subscriberBody.email_address + ' is now subscribed',
										type: 'success',
										confirmButtonText: 'OK'
									})
								}
							});
						};
		 			}]
      };
  });

})();
