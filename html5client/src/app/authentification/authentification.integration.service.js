angular.module('zeiterfassung.authentification.integrationservices', [])

    .factory('AuthentificationIntegrationService', function ($http, $log, $q, REST) {

        function createSession(user) {
            var dfd = $q.defer();
            $log.debug('create session for user: ' + angular.toJson(user, true));
            $http.post(REST.SESSIONS, user, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        return {
            createSession: createSession
        };
    });
