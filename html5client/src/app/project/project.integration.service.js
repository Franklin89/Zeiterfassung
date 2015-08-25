/**
 * Created by U110333 on 25.08.2015.
 */

angular.module('zeiterfassung.project.integrationservices', [])

    .factory('ProjectIntegrationService', function ($http, $log, $q, REST) {

        function readPojects() {
            var dfd = $q.defer();
            $log.info('readProjects');
            $http.get(REST.PROJECT + '/readprojects', null, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function createProject(project) {
            var dfd = $q.defer();
            $log.debug('createProject: ' + angular.toJson(project, true));
            $http.post(REST.PROJECT + '/createProject', project, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function editProject(editedProject) {
            var dfd = $q.defer();
            $log.debug('editProject: ' + angular.toJson(editedProject, true));
            $http.put(REST.PDV + '/editProject', editedProject, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        function deleteProject(project) {
            var dfd = $q.defer();
            $log.debug('DeleteProject: ' + angular.toJson(project, true));
            $http.delete(REST.PROJECT + '/deleteProject?id=' + project.id, {tracker: 'rest'})
                .success(function (result) {
                    dfd.resolve(result);
                })
                .error(function (result, status, headers, config) {
                    dfd.reject({result: result, status: status});
                });
            return dfd.promise;
        }

        return {
            createProject: createProject,
            readPojects: readPojects,
            deleteProject: deleteProject,
            editProject: editProject
        };
    });