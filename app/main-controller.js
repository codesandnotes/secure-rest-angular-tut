'use strict';

angular.module('secure-rest-angular-tut').controller('MainCtrl', function ($resource, $scope) {
	console.log('Oh, hi!');

	$scope.greetings = {
		open: {
			getResult: '',
			postValue: 'some value'
		}
	};

	/*
	 var Server = $resource('/rest/v1/document', {}, {
	 createDocument: {method: 'POST', isArray: false},
	 getDocument: {method: 'GET', url: '/rest/v1/document/:documentId', cache: false, isArray: false},
	 modifyDocument: {method: 'PUT', isArray: false},
	 newAttachment: {method: 'POST', url: '/rest/v1/document/:documentId/attachment', isArray: false}
	 });
	 */
	var openResources = $resource('http://localhost:8081/rest/open', {}, {
		get: {method: 'GET', cache: false, isArray: false},
		post: {method: 'POST', isArray: false}
	});

	$scope.getOpenGreetings = function() {
		$scope.greetings.open.getResult = '';

		openResources.get().$promise.then(function (response) {
			console.log('GET /rest/open returned: ', response);
			$scope.greetings.open.getResult = response.greetings;
		});
	};

	$scope.postOpenGreetings = function() {
		openResources.post({greetings: $scope.greetings.open.postValue}).$promise.then(function(response) {
			console.log('POST /rest/open returned: ', response);
			console.info('You might want to check the server logs to see that the POST has been handled!');
		});
	};
});