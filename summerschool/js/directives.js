angular.module('myApp').directive('helloWorld', function() {
	return {
		restrict : 'AEC',
		replace : true,
		template : '<h3>Hello, World!</h3>'
	};
});

angular.module('myApp').directive('btSmartbutton', function() {
	return {
		scope: {
			title:'@',
			label:'@',
			status: '@'
		},
		templateUrl : 'template/bt-smartbutton.html',
		link: function(scope, element, attributes){
			scope.status = 5;
			
			scope.click = function(){
				alert(typeof scope.status);
				scope.status = parseInt(scope.status);
				scope.status += 1;
				alert(scope.status);
			};
			scope.getStatus = function(){
				return scope.status;
			};
        }
	};
});

angular.module('myApp').directive('myTest', function() {
	return {
		template : 'test OK:{{text}}'
	};
});