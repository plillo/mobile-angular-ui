angular.module('multibutton').directive('btMulti', function() {
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
        	alert(element.html());
        	if(number)
	    		for(var i=0; i<number; i++)
	    			element.find('.bt-multi').append('<bt-button></bt-button>');

    		// ...then RETURN the link function
    		return function(scope, element, attributes){
    			// ...

        }
      }
	};
});

angular.module('multibutton').directive('btMultibutton', function() {
	return {
		replace: false,
		scope: {
			title:'@',
			label:'@',
			number:'@'
		},
		templateUrl : 'template/bt-multibutton.html',
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
        	if(number)
	    		for(var i=0; i<number; i++)
	    			element.find('.bt-multibutton').append('<bt-button></bt-button>');

    		// ...then RETURN the link function
    		return function(scope, element, attributes){
    			// ...

        }
      }
	};
});

angular.module('multibutton').directive('btButton', function() {
	return {
		replace: false,
		scope: {
		},
		templateUrl : 'template/bt-button.html',
		controller: function($scope, $element){
	       	// insert here scope-properties
			// ...

	       	// insert here scope-functions
			// ...
	    },
        compile: function(element, attributes){
        	// Do here DOM transformations which are executed before than LINK function...
    		// ...
        	element.find('.bt-button').html('<span>B</span>')

    		// ...next RETURN the link function
    		return function(scope, element, attributes){
    			// ...
        }
      }
	};
});