$(document).ready(function() {
	var url = 'ws://calimero:61614';
	connect(url);
	
	// connection to the STOMP broker
	// and subscription to the button topic
	//
	function connect(url) {
		// callback if successfully connected to the STOMP broker
		var connectedCallback = function(frame) {
			alert("connected to Stomp");
			
			// button status topic
			var destination = "/topic/app001.button.msb1";
			
			// subscribe and callback
			client.subscribe(destination, function(message) {
				var payload = JSON.parse(message.body);
				alert(''+payload.status);
			});
		};
		
		// create the STOMP client - GLOBALE
		client = Stomp.client(url);

		// and connect to the STOMP broker
		client.connect({}, connectedCallback);
	};
});