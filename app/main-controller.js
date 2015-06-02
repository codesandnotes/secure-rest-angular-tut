'use strict';

angular.module('secure-rest-angular-tut').controller('MainCtrl', function ($resource, $scope, Login) {

	$scope.greetings = {
		open: {
			getResult: '',
			postValue: 'some value'
		}
	};

	$scope.login = {
		username: '',
		password: ''
	};

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

	$scope.login = function () {

		Login.login($scope.login.username, $scope.login.password, function (data, status, headers, config) {
			// Success handler
			console.info('The user has been successfully logged in! ', data, status, headers, config);

		}, function(data, status, headers, config) {
			// Failure handler
			console.error('Something went wrong while trying to login... ', data, status, headers, config);
		});
	};

	$scope.postOpenGreetings = function() {
		openResources.post({greetings: $scope.greetings.open.postValue}).$promise.then(function(response) {
			console.log('POST /rest/open returned: ', response);
			console.info('You might want to check the server logs to see that the POST has been handled!');
		});
	};
});