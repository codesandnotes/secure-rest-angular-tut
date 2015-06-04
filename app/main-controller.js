'use strict';

angular.module('secure-rest-angular-tut').controller('MainCtrl', function ($cookies, $http, $location, $resource, $scope, Cookies, Login) {

	$scope.greetings = {
		open: {
			getResult: '',
			postValue: 'some value'
		},
		secure: {
			getResult: '',
			postValue: 'some secure value'
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

	$scope.postOpenGreetings = function() {
		openResources.post({greetings: $scope.greetings.open.postValue}).$promise.then(function(response) {
			console.log('POST /rest/open returned: ', response);
			console.info('You might want to check the server logs to see that the POST has been handled!');
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

	$scope.logout = function() {
		Login.logout(function (data, status, headers, config) {
			// Success handler TODO: if we comment this, we could check if the user correctly logged out of the server
			$scope.login = {username: '', password: ''};
			delete $cookies['JSESSIONID'];
			console.info('The user has been logged out!');

			$location.url('/');

		}, function(data, status, headers, config) {
			// Failure handler
			console.error('Something went wrong while trying to logout... ', data, status, headers, config);
		});
	};

	var secureResources = function (csrfToken) {
		var headers = $http.defaults.headers.post;
		if (csrfToken !== undefined) {
			headers[$http.defaults.xsrfHeaderName] = csrfToken;
		}

		return $resource('http://localhost:8081/rest/secure', {}, {
			get: {method: 'GET', cache: false, headers: headers, isArray: false},
			options: {method: 'OPTIONS', cache: false},
			post: {method: 'POST', headers: headers, isArray: false}
		});
	};

	$scope.getSecureGreetings = function() {
		$scope.greetings.secure.getResult = '';

		secureResources().options().$promise.then(function (response) {
			console.log('Obtained a CSRF token in a cookie', response);

			// Extract the CSRF token
			var csrfToken = Cookies.getFromDocument($http.defaults.xsrfCookieName);
			console.log('Extracted the CSRF token from the cookie', csrfToken);

			secureResources(csrfToken).get().$promise.then(function (response) {
				console.log('GET /rest/secure returned: ', response);
				$scope.greetings.secure.getResult = response.greetings;

			}).catch(function(response) {
				if (response.status === 401) {
					console.error('You need to login first!');

				} else {
					console.error('Something went wrong...', response);
				}
			});
		});
	};

	$scope.postSecureGreetings = function () {
		secureResources().options().$promise.then(function (response) {
			console.log('Obtained a CSRF token in a cookie', response);

			// Extract the CSRF token
			var csrfToken = Cookies.getFromDocument($http.defaults.xsrfCookieName);
			console.log('Extracted the CSRF token from the cookie', csrfToken);

			secureResources(csrfToken).post({greetings: $scope.greetings.secure.postValue}).$promise.then(function (response) {
				console.log('POST /rest/secure returned: ', response);
				console.info('You might want to check the server logs to see that the POST has been handled!');

			}).catch(function(response) {
				if (response.status === 401) {
					console.error('You need to login first!');

				} else {
					console.error('Something went wrong...', response);
				}
			});
		});
	};
});