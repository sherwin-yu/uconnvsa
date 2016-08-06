(function(){

  // include our submodules
  angular.module('personalWebsite',[
      'ngRoute' // simple page routing and templating
  ])

  .config(['$routeProvider', function($routeProvider){
    // configure page routes
    // to add a new page, create a new html file in templates, and add an entry here
    $routeProvider.when('/',{
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardController', //this page will use AccountsController
      controllerAs: 'dashCtrl' // you will reference it as dashCtrl in your templates
                              // i.e. accountshCtrl.myValue maps to this.myValue inside the controller
    })
    .otherwise({redirectTo: '/'});

  }])

  //controller for new accounts page
  .controller('DashboardController', [ function() {
	  var that = this;



  }])


  ;
})();
