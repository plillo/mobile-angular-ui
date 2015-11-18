'use strict';
angular.module('myApp', [ 'myApp.controllers', 'ui.router' ]);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider.state('view1', {
		url : '/view1',
		controller : 'Controller1',
		templateUrl : 'partials/view1.html'
	}).state('view2', {
		url : '/view2', 
		controller : 'Controller2',
		templateUrl : 'partials/view2.html'
	}).state('view3', {
		url : '/view3/:parameter',
		controller : 'Controller3',
		templateUrl : 'partials/view3.html'
	}).state('view4', {
		url: '/view4',
		controller : 'Controller4',
		templateUrl : '/view4.tpl'
	});
	$urlRouterProvider.otherwise('/view1');
});

/*
angular.module('myApp').controller('TemplateController', ['$scope', function($scope) {
	$scope.label = 'Tobias';
}]);

angular.module('myApp').directive('btSmartbutton', function() {
	return {
		restrict : 'AEC',
		replace : true,
		scope: {},
		link: function (scope, element) {
		      scope.label = 'io sono un pulsante intelligente';
		    },
		templateUrl : 'template/bt-smartbutton.html'
	};
});
*/