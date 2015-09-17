(function() {
    'use strict';

    angular.module(
        'zeiterfassung.authentication.integrationservices',
        ['zeiterfassung.ui.app.constants', 'LocalStorageModule', 'angular-md5'])

        .factory(
            'AuthenticationIntegrationService',
            ['$http', '$log', '$q', 'localStorageService', 'REST', 'md5',
            function($http, $log, $q, localStorageService, REST, md5) {
                localStorageService.remove('authData');
                var authentication = {
                    isAuth: false,
                    userName: ''
                };

                function login(user) {
                    var dfd = $q.defer();
                    $log.debug('login user: ' + angular.toJson(user, true));
                    $http.post(REST.ACCOUNT + '/login', {
                        Username: user.username,
                        PasswordHash: md5.createHash(user.password)
                    })
                        .success(function(result) {
                            localStorageService.set('authData', {token: JSON.parse(result)});

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

                return {
                    login: login,
                    logout: logout,
                    isAuth: isAuth
                };
            }])
        .factory('AuthenticationInterceptorService', ['$q', '$injector', 'localStorageService',
            function($q, $injector, localStorageService) {
                function request(config) {
                    config.headers = config.headers || {};
                    var authData = localStorageService.get('authData');

                    if (authData) {
                        config.headers['api-token'] = authData.token;
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
