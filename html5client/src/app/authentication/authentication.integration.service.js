angular.module('zeiterfassung.authentication.integrationservices', ['zeiterfassung.ui.app.constants'])
    .factory('AuthenticationIntegrationService', ['$http', '$log', '$q', 'REST', function ($http, $log, $q, REST) {
        function login(user) {
            var dfd = $q.defer();
            $log.debug('login user: ' + angular.toJson(user, true));
            $http.post(REST.ACCOUNT + '/login', {Username: user.name, PasswordHash: user.password})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        return {
            login: login
        };
    }]);
