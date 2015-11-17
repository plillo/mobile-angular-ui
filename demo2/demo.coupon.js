angular.module('retail-profiler.coupon', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
	    $stateProvider
		    .state('coupon', {
		    	url: '/coupon',
		    	templateUrl: 'coupon.html'
		    })
		    .state('coupon.uno', {
		    	url: '/coupon/uno',
		    	templateUrl: 'coupon.uno.html'
		    })
		    .state('coupon.uno.test', {
		    	url: '/coupon/test',
		    	templateUrl: 'coupon.uno.test.html'
		    })
		    .state('coupon.due', {
		    	url: '/coupon/due',
		    	templateUrl: 'coupon.due.html'
		    })
		    .state('coupon.tre', {
		    	url: '/coupon/tre',
		    	templateUrl: 'coupon.tre.html'
		    });
	}
]);
