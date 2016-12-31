(function(){

  // include our submodules
  angular.module('uconnvsa',[
      'ngRoute', // simple page routing and templating
      'ui.materialize', //angular-materialize plugin
      'vsa-footer', //footer
      'instafeed', // instagram api
      'mail', //mail api using sendgrid
      'subscribe', //mailchimp api to subscribe emails
      'ui.calendar' //angular ui calendar directive
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
  .controller('HomeController', [ '$location', function($location) {
	  var that = this;

    //learn more button
    that.learnMore = function() {
      return $location.url('/about');
    }

    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }])

  //controller for about page
  .controller('AboutController', [ '$scope', '$route', function($scope, $route) {
    var that = this;
    $(document).ready(function(){
      $('.parallax').parallax();
    });

  }])

  //controller for eboard page
  .controller('EboardController', [ function() {
    var that = this;
    that.eboard = members;

    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }])

  //controller for events page
  .controller('EventsController', [ '$scope', function($scope) {
    var that = this;

    $scope.eventSources = [{
      googleCalendarApiKey: 'AIzaSyBh9l6I22E4KZgrrjbP5xINkCG9HczMdBg',
      googleCalendarId: 'pdhgtol8mqobpml89phgmbf6sc@group.calendar.google.com',
      className: 'gcal-event' // an option!
    }];

    //initialize parallax
    $(document).ready(function(){
      $('.parallax').parallax();
    });


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

    $(document).ready(function(){
      $('.parallax').parallax();

      $('.carousel').carousel();

    });

  }])


  //controller for network page
  .controller('NetworkController', [ function() {
    var that = this;

    $(document).ready(function(){
      $('.parallax').parallax();
    });

  }])

  //controller for contact page
  .controller('ContactController', ['mailService', '$scope', function(mailService, $scope) {
    var that = this;
    $scope.contact = {};

    /*
    * POST mail call to send email
    */
    that.sendMail = function(email){
      mailService.sendMail(email, function(data){
        console.log('mail', data);
        //reset form
        $scope.contact ={};
        $scope.contactForm.$setPristine();
        swal({
          title: 'Success!',
          text: 'Message sent',
          type: 'success',
          confirmButtonText: 'OK'
        })
      });
    };

    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }])

  //eboard members TODO: Move this to a database
  var members = [
    {
      "name":"Sherwin Yu",
      "position":"Co-President",
      "hometown":"Bridgeport, CT",
      "year": "Freshman",
      "major": "Computer Science",
      "favoriteFood":"Steak",
      "vsaMeaning":"Home away from home",
      "image":"sherwin.jpg"
    },
    {
      "name":"Sherwin Me",
      "position":"Food Director",
      "hometown":"Storrs, CT",
      "year": "Senior",
      "major": "Culinary Arts",
      "favoriteFood":"Everything",
      "vsaMeaning":"Where I eat",
      "image":"eating.jpg"
    }
  ];



  ;
})();
