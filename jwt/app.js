angular.module('sample', [ 'ngStorage', 'angular-jwt' ])
	.config(function Config($httpProvider, jwtInterceptorProvider, $localStorageProvider) {
		// Please note we're annotating the function so that the $injector
		// works when the file is minified
		/*
		jwtInterceptorProvider.tokenGetter = [ 'myService',
				function(myService) {
					myService.doSomething();
					return localStorage.getItem('id_token');
				} ];
		*/
		jwtInterceptorProvider.tokenGetter = function() {
		    return $localStorageProvider.get('id_token');
		};
	    $httpProvider.defaults.useXDomain = true;
		$httpProvider.interceptors.push('jwtInterceptor');
	})
	.controller('MainCtrl', function Controller(jwtHelper, $scope, $http, $localStorage) {
		$scope.storage = $localStorage;
        $scope.storage.id_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJpYXQiOjE0MTIxOTg3MzB9.egsc0YfweH_O9cpOApAkYbAw58buECpjDG77hfDUS_0"
            
        // Try another token by getting them from http://jwt.io
        
        $scope.$watch('storage.id_token', function(token) {
            if (!token) return;

            try{
                $scope.decodedToken = jwtHelper.decodeToken(token);
            }
            catch(err){
            	alert(err);
            }
        });
		
		// If localStorage contains the id_token it will be sent in the request
		// Authorization: Bearer [yourToken] will be sent
		$http({
			//url : 'http://localhost:8080/users/1.0/test/',
			url : 'http://localhost:8080/users/1.0/login/?identificator=mario@pippo.com&password=1234',
			method : 'GET'
		}).then(function(message){},function(message){alert('ERR:'+JSON.stringify(message));});
	});