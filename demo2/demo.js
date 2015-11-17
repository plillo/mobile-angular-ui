// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('RetailProfiler', [
  //'ngRoute',
  'ui.router',
  'mobile-angular-ui',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures',
  'ngStorage',
  'hash',
  'retail-profiler.coupon'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
//
/*
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/login',         {templateUrl: 'login.html', reloadOnSearch: false}); 
  $routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false}); 
  $routeProvider.when('/toggle',        {templateUrl: 'toggle.html', reloadOnSearch: false}); 
  $routeProvider.when('/docs',          {templateUrl: 'docs.html', reloadOnSearch: false}); 
  $routeProvider.when('/issues',        {templateUrl: 'issues.html', reloadOnSearch: false}); 
});
*/

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
	.state('home',{
		  url: '/',
		  templateUrl: 'home.html'
	  })
	.state('login',{
		  url: '/login',
		  templateUrl: 'login.html'
	  })
	.state('scroll',{
		  url: '/scroll',
		  templateUrl: 'scroll.html'
	  })
	.state('docs',{
		  url: '/docs',
		  templateUrl: 'docs.html'
	  })
	.state('issues',{
		  url: '/issues',
		  templateUrl: 'issues.html'
	  });
  		
  	$urlRouterProvider.otherwise('/');
});

app.config(function(loggerProvider){
	loggerProvider.setUrl('http://localhost:8080/users/1.0/');
});
