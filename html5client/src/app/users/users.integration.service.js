/**
 * Created by U110333 on 25.08.2015.
 */

angular.module('zeiterfassung.ui.users.integrationservices', [])

    .factory('UsersIntegrationService', function ($http, $log, $q, REST) {

        function readUsers() {
            var dfd = $q.defer();
            $log.info('readUsers');
            $http.get(REST.USERS, null, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function readUserForId(userId) {
            var dfd = $q.defer();
            $log.info('readUsers');
            $http.get(REST.USERS + '/' + userId, null, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function createUser(userTemplate) {
            var dfd = $q.defer();
            $log.debug('createUser: ' + angular.toJson(project, true));
            $http.post(REST.USERS, userTemplate, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function editUser(user) {
            var dfd = $q.defer();
            $log.debug('editUser: ' + angular.toJson(user, true));
            $http.put(REST.USERS, user, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function deleteUser(userId) {
            var dfd = $q.defer();
            $log.debug('DeleteUser: ' + angular.toJson(userId, true));
            $http.delete(REST.USERS + '/' + userId, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        return {
            readUsers: readUsers,
            readUserForId: readUserForId,
            createUser: createUser,
            editUser: editUser,
            deleteUser: deleteUser
        };
    });