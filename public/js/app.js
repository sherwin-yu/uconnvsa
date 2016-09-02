(function(){

  // include our submodules
  angular.module('uconnvsa',[
      'ngRoute', // simple page routing and templating
      'ui.materialize', //angular-materialize plugin
      'instafeed' // instagram api
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    // configure page routes
    // to add a new page, create a new html file in templates, and add an entry here
    $routeProvider.when('/',{
      templateUrl: 'templates/home.html',
      controller: 'HomeController', //this page will use HomeController
      controllerAs: 'homeCtrl' // you will reference it as homeCtrl in your templates
                              // i.e. homeCtrl.myValue maps to this.myValue inside the controller
    })
      .when('/about',{
        templateUrl: 'templates/about.html',
        controller: 'AboutController',
        controllerAs: 'aboutCtrl'
      })
      .when('/eboard',{
        templateUrl: 'templates/eboard.html',
        controller: 'EboardController',
        controllerAs: 'eboardCtrl'
      })
      .when('/events',{
        templateUrl: 'templates/events.html',
        controller: 'EventsController',
        controllerAs: 'eventsCtrl'
      })
      .when('/media',{
        templateUrl: 'templates/media.html',
        controller: 'MediaController',
        controllerAs: 'mediaCtrl'
      })
      .when('/network',{
        templateUrl: 'templates/network.html',
        controller: 'NetworkController',
        controllerAs: 'networkCtrl'
      })
      .when('/contact',{
        templateUrl: 'templates/contact.html',
        controller: 'ContactController',
        controllerAs: 'contactCtrl'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }])

  //controller for home page
  .controller('HomeController', [ function() {
	  var that = this;
  }])

  //controller for about page
  .controller('AboutController', [ function() {
    var that = this;
  }])

  //controller for eboard page
  .controller('EboardController', [ function() {
    var that = this;
  }])
  
  //controller for events page
  .controller('EventsController', [ function() {
    var that = this;
  }])

  //controller for media page
  .controller('MediaController', ['instagramAPI', function(instagramAPI) {
    var that = this;
    that.pics = {};

    /*
    * Retrives all the pictures associated with the user from Instagram
    */
    instagramAPI.fetchPhotos(function(data) {
      console.log('instagram feed', data);
      that.pics = data;
    });

  }])


  //controller for network page
  .controller('NetworkController', [ function() {
    var that = this;
  }])

  //controller for contact page
  .controller('ContactController', [ function() {
    var that = this;
  }])





  ;
})();
