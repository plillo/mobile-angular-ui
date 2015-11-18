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
				var payload = JSON.parse(message.body);
				
				if(payload.status > $scope.statesNumber)
					return;
				
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
							broker.client.send($scope.topic, {retain:'set'}, JSON.stringify({status:$scope.status}));
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

			// Get from attribute 'status' and Set <status> in scope
			scope.status = parseInt(attributes['status']);
			
			scope.topic = attributes['topic'];
			if(scope.topic) {
				broker.deferred.then(
					function(message){
						broker.client.subscribe(scope.topic, scope.getTopicStatus);
					},
					function(message){
						alert('Promise rejected with message: '+message);
					});
			}

			scope.width = parseInt(attributes['width']);
   			scope.height = parseInt(attributes['height']);
			scope.backgroundImg = attributes['background'];
			scope.leftBackgroundPos = -(scope.status-1) * scope.width;

			// Get from attribute 'states-number' Set <statesNumber> in scope
			scope.statesNumber = parseInt(attributes['statesnumber']);

			// STYLING ELEMENT
			scope.class = attributes['class'];

			// -- width, height
			scope.element.css('width', scope.width);
   			scope.element.css('height', scope.height);

   			// -- background image
   			if(scope.backgroundImg!==undefined)
   				scope.element.css('background-image','url('+scope.backgroundImg+')');
   			scope.element.css('background-position',scope.leftBackgroundPos+'px -'+scope.height*2+'px');
   			// -- line-height
   			scope.element.find('.bt-label').css('line-height', scope.height+'px');

   			// EVENTS BINDING
   			scope.element.bind('mouseover', scope.onMouseOver);
   			scope.element.bind('mouseout', scope.onMouseOut);
   			scope.element.bind('mousedown', scope.onMouseDown);	
   			scope.element.bind('mouseup', scope.onMouseUp);
        }
	};
});

angular.module('plunker').directive('myTag', function() {
return {
  scope: {},
  template: 'WOW {{name}}!<scan ng-click="sclick()">click</scan>-<scan ng-click="kclick()">click</scan><br /><input ng-click="click()" name="name" ng-model="name" /><br />{{status}}.{{clicked}}.<span id="iamk"></span>',
  controller: function($scope, $element){
       $scope.clicked = 0;
       var k =0;
       $scope.click = function(){
         $scope.clicked++;
       };
       $scope.sclick = function(){
         $scope.status++;
       };
       $scope.kclick = function(){
         k++;
         $element.find('#iamk').html(k);
       };
    },
  compile: function(element, attributes){
    // qui si possono fare le trasformazioni del DOM che vengono eseguite prima della LINK function...
		element.css("color","red");

		// ...poi si restituisce la LINK function
		return function(scope, element, attributes){
		  scope.name = 'pippo';
		  scope.status=parseInt(attributes['status']);
		  
		  console.log(status);
    }
  }
}
});