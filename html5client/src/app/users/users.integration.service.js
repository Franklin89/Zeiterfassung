(function() {
    'use strict';

    angular.module('zeiterfassung.users.integrationservices', ['zeiterfassung.ui.app.constants'])

        .factory('UsersIntegrationService', function($http, $log, $q, REST) {

            function readUsers() {
                var dfd = $q.defer();
                $log.info('readUsers');
                console.log('read users 1');
                $http.get(REST.USERS, {tracker: 'rest'})
                    .success(function(result) {
                        console.log('read users 2');
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        console.log('read users 3');
                        dfd.reject({result: result, status: status});
                    });
                console.log('read users 4');
                return dfd.promise;
            }

            function readUserForId(userId) {
                var dfd = $q.defer();
                $log.info('readUsers');
                $http.get(REST.USERS + '/' + userId, null, {tracker: 'rest'})
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
                return dfd.promise;
            }

            function getUserByUsername(userName) {
                var dfd = $q.defer();
                $log.info('getUserByUsername');
                $http.get(REST.USERS + '/GetByUsername/' + userName, null, {tracker: 'rest'})
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
                return dfd.promise;
            }

            function createUser(userTemplate) {
                var dfd = $q.defer();
                console.log('1');
                $log.debug('createUser: ' + angular.toJson(userTemplate, true));
                $http.post(REST.USERS, userTemplate, {tracker: 'rest'})
                    .success(function(result) {
                        console.log('2');
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        console.log('3');
                        dfd.reject({result: result, status: status});
                    });
                console.log('4');
                return dfd.promise;
            }

            function editUser(user) {
                var dfd = $q.defer();
                $log.debug('editUser: ' + angular.toJson(user, true));
                $http.put(REST.USERS + '/' + user.Id, user, {tracker: 'rest'})
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
                return dfd.promise;
            }

            function deleteUser(userId) {
                var dfd = $q.defer();
                $log.debug('DeleteUser: ' + angular.toJson(userId, true));
                $http.delete(REST.USERS + '/' + userId, {tracker: 'rest'})
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
                return dfd.promise;
            }

            function createUserNew(userTemplate) {
                var dfd = $q.defer(), promises = [];
                $log.debug('createProject: ' + angular.toJson(userTemplate, true));
                console.log('createUserNew 1');
                promises.push(function() {
                    $http.post(REST.USERS, userTemplate, {tracker: 'rest'})
                        .error(function(result, status) {
                            console.log('createUserNew 2');
                            dfd.reject({result: result, status: status});
                        });
                });
                console.log('createUserNew 3');
                $q.all(promises).then(dfd.resolve());
                console.log('createUserNew 4');
                return dfd.promise;
            }

            return {
                readUsers: readUsers,
                readUserForId: readUserForId,
                getUserByUsername: getUserByUsername,
                createUser: createUser,
                createUserNew: createUserNew,
                editUser: editUser,
                deleteUser: deleteUser
            };
        });
})();
