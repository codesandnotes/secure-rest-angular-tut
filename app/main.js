'use strict';

angular.module('secure-rest-angular-tut', [
	'ngCookies',
	'ngResource'
	//'ngRoute'
]);

angular.module('secure-rest-angular-tut').config(['$httpProvider', function ($httpProvider) {

	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.xsrfCookieName = undefined;
	$httpProvider.defaults.xsrfHeaderName = undefined;

}]);
