'use strict';
angular.module('myApp.controllers', [])
	.controller('MainController', function($scope) {
            $scope.Mahesh = {};
            $scope.Mahesh.name = "Mahesh Parashar";
            $scope.Mahesh.rollno  = 1;

            $scope.Piyush = {};
            $scope.Piyush.name = "Piyush Parashar";
            $scope.Piyush.rollno  = 2;
         })
	.controller('Controller1', function($scope) {
			$scope.message = 'Hello, world';
		})
	.controller('Controller2', function($scope) {
			$scope.now = new Date();
		})
	.controller('Controller3', function($scope,$stateParams) {
			$scope.parameter = $stateParams.parameter;
		})
	.controller('Controller4', function($scope) {
		$scope.message = 'Template in-line';
	});