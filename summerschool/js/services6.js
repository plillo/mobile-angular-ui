angular.module('plunker').service('broker', function() {
	var instance = this;
	this.connected = false;
	this.clientID = Math.random().toString(12);
	this.topicHandlers = new Map();
	
	// Set the broker client
	this.client = new Paho.MQTT.Client('calimero', 61614, this.clientID);
	// broker client: onConnectionLost CALLBACK
    this.client.onConnectionLost = function(responseObject) {
        alert('Connection lost: '+responseObject.errorCode+'-'+responseObject.errorMessage);
    };
	// broker client: onMessageArrived CALLBACK
    this.client.onMessageArrived = function(message) {
    	// read topic
        var topic = message.destinationName;
        // get topic handler
        var topicHandler = instance.topicHandlers.get(topic);
        // call topic handler with payload
        if(topicHandler)
        	topicHandler(message.payloadString);
    };
    // Topic subscription
    this.subscribe = function(topic, topicHandler){
    	// subscribe topic
    	instance.client.subscribe(topic);
    	// set topic handler
    	instance.topicHandlers.set(topic, topicHandler);
    };
});

angular.module('plunker').run(function($q, broker) {
	var deferred = $q.defer(); // create new deferred object
	
	// Connection to the broker
	broker.client.connect({
		onSuccess:function(frame) { // connection OK
			broker.connected = true;
			deferred.resolve('Promise resolved');
		},
		onFailure:function(error) { // NO connection
			broker.connected = false;
			deferred.reject('Promise rejected');
		}
	});
	broker.deferred = deferred.promise;
});
