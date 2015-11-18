'use strict';
angular.module('myApp.controllers', [])
	.controller('MainController', function($scope) {
			$scope.text = 'Hi all!';
		})
	.controller('Controller1', function($scope) {
			$scope.message = 'Hello, world';
		})
	.controller('Controller2', function($scope) {
			$scope.now = new Date();
		})
	.controller('Controller3', function($scope,$routeParams) {
			$scope.parameter = $routeParams.parameter;
		})
	.controller('Controller4', function($scope) {
		$scope.message = 'Template in-line';
	});