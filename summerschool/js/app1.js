'use strict';
angular.module('myApp', [ 'myApp.controllers', 'ngRoute' ]);

angular.module('myApp').config(function($routeProvider) {
	$routeProvider.when('/view1', {
		controller : 'Controller1',
		templateUrl : 'partials/view1.html'
	}).when('/view2', {
		controller : 'Controller2',
		templateUrl : 'partials/view2.html'
	}).when('/view3/:parameter', {
		controller : 'Controller3',
		templateUrl : 'partials/view3.html'
	}).when('/view4', {
		controller : 'Controller4',
		templateUrl : '/view4.tpl'
	}).otherwise({
		redirectTo : '/view1'
	});
});
