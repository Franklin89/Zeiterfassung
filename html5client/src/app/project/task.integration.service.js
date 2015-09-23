/**
 * Created by U110333 on 25.08.2015.
 */

(function() {
    'use strict';

    angular.module('zeiterfassung.task.integrationservices', ['zeiterfassung.ui.app.constants'])

    .factory('TaskIntegrationService', ['$http', '$log', '$q', 'REST', function($http, $log, $q, REST) {

        function createTask(task) {
            var dfd = $q.defer(), promises = [];

            $log.debug('createTask: ' + angular.toJson(task, true));
            promises.push(function() {
                $http.post(REST.TASKS, task, {tracker: 'rest'})
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
            });
            $q.all(promises).then(dfd.resolve());
            return dfd.promise;
        }

        function editTask(task) {
            var dfd = $q.defer();
            $log.debug('editProject: ' + angular.toJson(task, true));
            $http.put(REST.PROJECTS + '/' + task.Id, task, {tracker: 'rest'})
                .success(function(result) {
                    dfd.resolve(result);
                })
                .error(function(result, status) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function deleteTask(task) {
            var dfd = $q.defer();
            $log.debug('DeleteTask: ' + angular.toJson(task, true));
            $http.delete(REST.TASKS + '/' + task.Id, {tracker: 'rest'})
                .success(function(result) {
                    dfd.resolve(result);
                })
                .error(function(result, status) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function updateTasks(tasks) {

            var dfd = $q.defer(), i = 0, t, executor;

            executor = function(task) {
                $log.debug('updateProjects: ' + angular.toJson(task, true));
                $http.put(REST.TASKS + '/' + task.Id, task)
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
            };

            for (i = 0; i < tasks.length; i++) {
                t = tasks[i];
                executor(t);
            }
            return dfd.promise;
        }

            function readTasks() {
                var dfd = $q.defer();
                $log.info('readAllTasks');
                $http.get(REST.TASKS, null)
                    .success(function(result) {
                        dfd.resolve(result);
                    })
                    .error(function(result, status) {
                        dfd.reject({result: result, status: status});
                    });
                return dfd.promise;
            }

        return {
            createTask: createTask,
            editTask: editTask,
            deleteTask: deleteTask,
            updateAllTasks: updateTasks,
            readAllTasks: readTasks
        };
    }]);
})();
