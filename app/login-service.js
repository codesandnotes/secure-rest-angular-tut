'use strict';

angular.module('secure-rest-angular-tut').factory('Login', function ($http, $resource, Cookies) {

	var loginResources = $resource('http://localhost:8081/login', {}, {
		options: {method: 'OPTIONS', cache: false}
	});

	/**
	 * Tries to detect whether the response elements returned indicate an invalid or missing CSRF token...
	 */
	var isCSRFTokenInvalidOrMissing = function (data, status) {
		return (status === 403 && data.message && data.message.toLowerCase().indexOf('csrf') > -1)
			|| (status === 0 && data === null);
	};

	return {
		/**
		 * Service function that logs in the user with the specified username and password.
		 * To handle the returned promise we use a successHandler/errorHandler approach because we want to have
		 * access to the additional information received when the failure handler is invoked (status, etc.).
		 */
		login: function(username, password, successHandler, errorHandler) {

			// Obtain a CSRF token
			loginResources.options().$promise.then(function (response) {
				console.log('Obtained a CSRF token in a cookie');

				// Extract the CSRF token
				var csrfToken = Cookies.getFromDocument($http.defaults.xsrfCookieName);
				console.log('Extracted the CSRF token from the cookie');

				// Prepare the headers
				var headers = {
					'Content-Type': 'application/x-www-form-urlencoded'
				};
				headers[$http.defaults.xsrfHeaderName] = csrfToken;

				// Post the credentials for logging in
				$http.post('http://localhost:8081/login', 'username=' + username + '&password=' + password, {
					headers: headers
				})
					.success(successHandler)

					.error(function (data, status, headers, config) {

						if (isCSRFTokenInvalidOrMissing(data, status)) {
							console.error('The obtained CSRF token was either missing or invalid. Have you turned on your cookies?');

						} else {
							// Nope, the error is due to something else. Run the error handler...
							errorHandler(data, status, headers, config);
						}
					});

			}).catch(function(response) {
				console.error('Could not contact the server... is it online? Are we?', response);
			});
		}
	};
});