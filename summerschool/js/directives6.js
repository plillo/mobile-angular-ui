angular.module('plunker').directive('btSmartbutton', function(broker) {
	return {
		replace: false,
		scope: {
			title:'@',
			label:'@'
		},
		templateUrl : 'template/bt-smartbutton.html',
		controller: function($scope, $element){
	       	// insert here scope-attributes
			// ...

			// click
			$scope.click = function(){
				$scope.status = ($scope.status % $scope.statesNumber) + 1;
				$scope.leftBackgroundPos = -($scope.status-1) * $scope.width;
			};
			
			// getTopicStatus
			$scope.getTopicStatus = function(message){
				// Get body message from topic
				
				var payload = undefined;
				try {
					var payload = JSON.parse(unescape(message));
				}
				catch(error) {
					alert(error);
					return;
				}
				
				if(payload.status > $scope.statesNumber)
					return;
				
				if(payload.label!=undefined){
					var number = Number(payload.label).toFixed(2);

					$scope.label = ''+number;
				}
					
				$scope.status = payload.status;
				$scope.leftBackgroundPos = -($scope.status-1) * $scope.width;

				// APPLY (in order to make visible changes to <status>)
				$scope.$apply();

				$scope.element.css('background-position',$scope.leftBackgroundPos+'px -'+$scope.height+'px');
			};

			// getStatus
			$scope.getStatus = function(){
				return $scope.status;
			};

			$scope.onMouseOver = function(){
				$scope.element.addClass('bt-mouseover');
				$scope.element.css('background-position',$scope.leftBackgroundPos+'px -'+$scope.height+'px');
			}

			$scope.onMouseOut = function(){
				$scope.element.removeClass('bt-mouseover');
				$scope.element.css('background-position',$scope.leftBackgroundPos+'px -'+$scope.height*2+'px');
			}

			$scope.onMouseDown = function(){
				$scope.element.addClass('bt-mousedown');
				$scope.element.css('background-position',$scope.leftBackgroundPos+'px 0');
			}

			$scope.onMouseUp = function(){
				$scope.status = ($scope.status % $scope.statesNumber) + 1;
				$scope.leftBackgroundPos = -($scope.status-1) * $scope.width;

				// APPLY (in order to make visible changes to <status>)
				$scope.$apply();

				$scope.element.removeClass('bt-mousedown');
				$scope.element.css('background-position',$scope.leftBackgroundPos+'px -'+$scope.height+'px');
				
				// publication to topic
				if($scope.topic) {
					broker.deferred.then(
						function(message){
							var sendmessage = new Paho.MQTT.Message(JSON.stringify({status:$scope.status}));
							sendmessage.destinationName = $scope.topic;
							sendmessage.retained = true;
							broker.client.send(sendmessage);
						},
						function(message){
							alert('Promise rejected with message: '+message);
						});
				}
			}
	    },
		link: function(scope, element, attributes){
			// Set <element> in scope
			scope.element = element.find('.bt-smartbutton');
			
		    if(scope.label==undefined)
		    	scope.element.find('.bt-label>span').hide();

			// Get from attribute 'status' and Set <status> in scope
			scope.status = parseInt(attributes['status']);
			
			scope.topic = attributes['topic'];
			if(scope.topic) {
				broker.deferred.then(
					function(message){
						broker.subscribe(scope.topic, scope.getTopicStatus);
					},
					function(message){
						alert('Promise rejected with message: '+message);
					});
			}

			scope.width = parseInt(attributes['width']);
   			scope.height = parseInt(attributes['height']);
			scope.iconImg = attributes['icon'];
			scope.backgroundImg = attributes['background'];
			scope.leftBackgroundPos = -(scope.status-1) * scope.width;
			
			var v_unit = scope.height/20;
			var h_unit = scope.width/20;

			// Get from attribute 'states-number' Set <statesNumber> in scope
			scope.statesNumber = parseInt(attributes['statesnumber']);

			// STYLING ELEMENT
			scope.class = attributes['class'];

			// -- width, height
			scope.element.css('width', scope.width);
   			scope.element.css('height', scope.height);

   			// -- icon image
   			if(scope.iconImg!==undefined){
   				var img = $('<img>');
   				img.attr('src', scope.iconImg);
   				img.css('width', (v_unit*10)+'px');
   				img.css('display', 'inline-block');
   				img.css('margin', (v_unit*5)+'px 0 0 '+(v_unit*5)+'px');
   				img.appendTo(scope.element.find('.bt-icon'));
   			}
   			else {
   				scope.element.find('.bt-icon').hide();
   			}
   			
			scope.element.find('.bt-label').css('position', 'absolute');
			scope.element.find('.bt-label').css('top', (scope.height-h_unit*4)+'px');
   			
			var w = scope.element.find('.bt-label>span').width();

			scope.element.find('.bt-label>span').css('display', 'table');
			scope.element.find('.bt-label>span').css('width', (h_unit*18)+'px');
			scope.element.find('.bt-label>span').css('font-size', (h_unit*2)+'px');
   			scope.element.find('.bt-label>span').css('margin', '0 '+h_unit+'px');
   			
   			// -- background image
   			if(scope.backgroundImg!==undefined)
   				scope.element.css('background-image','url('+scope.backgroundImg+')');
   			scope.element.css('background-position',scope.leftBackgroundPos+'px -'+scope.height*2+'px');
   			// -- line-height
   			//scope.element.find('.bt-label').css('line-height', scope.height+'px');

   			// EVENTS BINDING
   			scope.element.bind('mouseover', scope.onMouseOver);
   			scope.element.bind('mouseout', scope.onMouseOut);
   			scope.element.bind('mousedown', scope.onMouseDown);	
   			scope.element.bind('mouseup', scope.onMouseUp);
        }
	};
});

angular.module('plunker').directive('btMulti', function() {
	return {
		replace: false,
		scope: {
			number:'@'
		},
		templateUrl : 'template/bt-multi.html',
		controller: function($scope, $element){
	       	// insert here scope-properties
			// ...

	       	// insert here scope-functions
			// ...
			
	    },
        compile: function(element, attributes){
        	// Do here DOM transformations which are executed before than LINK function...
    		// ...
        	var number = Number(attributes['number']);
        	var inner = element.find('bt-multi').html();

        	if(number)
	    		for(var i=0; i<number; i++){
	    			if(i%20==0)
	    				element.find('.bt-multi').append('<br />');
	    			element.find('.bt-multi').append('<bt-smartbutton label="'+i+'" width="50" height="50" status="1" statesnumber="3"></bt-smartbutton>');
	    		}

    		// ...then RETURN the link function
    		return function(scope, element, attributes){
    			// ...

        }
      }
	};
});
