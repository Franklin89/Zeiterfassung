(function() {
    'use strict';

    angular.module(
        'zeiterfassung.authentication.integrationservices',
        ['zeiterfassung.ui.app.constants', 'LocalStorageModule', 'angular-md5'])

        .factory(
            'AuthenticationIntegrationService',
            ['$http', '$log', '$q', 'localStorageService', 'REST', 'md5',
            function($http, $log, $q, localStorageService, REST, md5) {
                var authentication, localAuthData;

                localStorageService.remove('authData');
                authentication = {
                    isAuth: false,
                    userName: ''
                };

                localAuthData = localStorageService.get('authData');
                if (localAuthData) {
                    authentication.isAuth = true;
                    authentication.userName = localAuthData.username;
                }

                function login(user) {
                    var dfd = $q.defer();
                    $log.debug('login user: ' + angular.toJson(user, true));
                    $http.post(REST.ACCOUNT + '/login', {
                        Username: user.username,
                        PasswordHash: md5.createHash(user.password)
                    })
                        .success(function(result) {
                            localStorageService.set('authData', {token: result, username: user.username});
                            localStorageService.set('userName', user.username);

                            authentication.isAuth = true;
                            authentication.userName = user.username;
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                }

                function logout() {
                    localStorageService.remove('authData');
                    authentication.isAuth = false;
                    authentication.userName = '';
                }

                function isAuth() {
                    return authentication.isAuth;
                }

                function isAdmin() {
                    return authentication.userName.toUpperCase() === REST.ADMINUSERNAME.toUpperCase();
                }

                function currentUsername() {
                    return authentication.userName;
                }

                var readUserData = function(){
                    var dfd = $q.defer();
                    $http.get(REST.ACCOUNT, null)
                        .success(function(result) {
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                };

                return {
                    login: login,
                    logout: logout,
                    isAuth: isAuth,
                    isAdmin: isAdmin,
                    currentUsername: currentUsername,
                    readUsers: readUserData
                };
            }])
        .factory('AuthenticationInterceptorService', ['$q', '$injector', 'localStorageService',
            function($q, $injector, localStorageService) {
                function request(config) {
                    config.headers = config.headers || {};
                    var authData = localStorageService.get('authData');

                    if (authData) {
                        config.headers['api-token'] = authData.token.replace(/['"]+/g, '');
                    }

                    return config;
                }

                function responseError(error) {
                    if (error.status === 401) {
                        // manually inject service to avoid circular reference
                        var stateService = $injector.get('$state');
                        stateService.go('login');
                    }
                    return $q.reject(error);
                }

                return {
                    request: request,
                    responseError: responseError
                };
            }
        ]);
})();
