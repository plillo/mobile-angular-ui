angular.module('plunker').service('broker', function() {
	this.client = Stomp.client('ws://calimero:61614');
	this.connected = false;
});

angular.module('plunker').run(function($q, broker) {
	var deferred = $q.defer(); // create new deferred object
	broker.client.connect({},
		function(frame) { // connection OK
			broker.connected = true;
			deferred.resolve('Promise resolved');
		},
		function(frame) { // NO connection
			broker.connected = false;
			deferred.reject('Promise rejected');
		});
	broker.deferred = deferred.promise;
});
