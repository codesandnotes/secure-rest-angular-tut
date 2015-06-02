'use strict';

angular.module('secure-rest-angular-tut', [
	'ngCookies',
	'ngResource'
	//'ngRoute'
]);

angular.module('secure-rest-angular-tut').config(['$httpProvider', function ($httpProvider) {

	$httpProvider.defaults.withCredentials = true;
	// Tough luck: the default cookie-to-header mechanism is not working for cross-origin requests!
	$httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN'; // The name of the cookie sent by the server
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'; // The default header name picked up by Spring Security

}]);
