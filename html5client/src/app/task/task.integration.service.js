angular.module('zeiterfassung.task.integrationservices', ['zeiterfassung.ui.app.constants'])
    .factory('TaskIntegrationService', function ($http, $log, $q, REST) {

        function readTasks() {
            var dfd = $q.defer();
            $log.info('readTasks');
            $http.get(REST.TASKS, null, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function createTask(task) {
            var dfd = $q.defer();
            $log.debug('createTask: ' + angular.toJson(task, true));
            $http.post(REST.TASKS, task, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function editTask(task) {
            var dfd = $q.defer();
            $log.debug('editTask: ' + angular.toJson(task, true));
            $http.put(REST.TASKS + '/' + task.Id, task, {tracker: 'rest'})
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
            $log.debug('deleteTask: ' + angular.toJson(task, true));
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
            readTasks: readTasks,
            deleteTask: deleteTask,
            editTask: editTask
        };
    });
