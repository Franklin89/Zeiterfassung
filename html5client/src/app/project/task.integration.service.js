/**
 * Created by U110333 on 25.08.2015.
 */

angular.module('zeiterfassung.task.integrationservices', ['zeiterfassung.ui.app.constants'])

    .factory('TaskIntegrationService', ['$http', '$log', '$q', 'REST', function ($http, $log, $q, REST) {

        function createTask(task) {
            var dfd = $q.defer();
            var promises = [];
            $log.debug('createTask: ' + angular.toJson(task, true));
            promises.push(new function () {
                $http.post(REST.TASKS, task, {tracker: 'rest'})
                    .error(function (result, status) {
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
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function deleteTask(task) {
            var dfd = $q.defer();
            $log.debug('DeleteTask: ' + angular.toJson(task, true));
            $http.delete(REST.TASKS + '/' + task.Id, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        return {
            createTask: createTask,
            editTask: editTask,
            deleteTask: deleteTask
        };
    }]);