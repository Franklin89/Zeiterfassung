(function() {
    'use strict';
    angular.module('zeiterfassung.project.integrationservices', ['zeiterfassung.ui.app.constants'])

        .factory('ProjectIntegrationService', ['$http', '$log', '$q', 'REST', 'TaskIntegrationService',
            function($http, $log, $q, REST, taskIntegrationService) {

                function readProjects() {
                    var dfd = $q.defer();
                    $log.info('readProjects');
                    $http.get(REST.PROJECTS, null)
                        .success(function(result) {
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                }

                function createProject(project, tasks) {
                    var dfd = $q.defer(), promises = [];
                    $log.debug('createProject: ' + angular.toJson(project, true));

                    promises.push(new function() {
                        $http.post(REST.PROJECTS, project, {tracker: 'rest'})
                            .error(function(result, status) {
                                dfd.reject({result: result, status: status});
                            });
                    });

                    angular.forEach(tasks, function(task) {
                        task.ProjectId = project.Id;
                        promises.push(new function() {
                            $http.post(REST.TASKS, task, {tracker: 'rest'})
                                .error(function(result, status) {
                                    dfd.reject({result: result, status: status});
                                });
                        });
                    });

                    $q.all(promises).then(dfd.resolve());
                    return dfd.promise;
                }

                function editProject(project) {
                    var dfd = $q.defer();
                    $log.debug('editProject: ' + angular.toJson(project, true));
                    $http.put(REST.PROJECTS + '/' + project.Id, project, {tracker: 'rest'})
                        .success(function(result) {
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                }

                function updateProjects(projects) {
                    var dfd = $q.defer(), i, project;

                    for (i = 0; i < projects.length; i++) {
                        project = projects[i];
                        $log.debug('updateProjects: ' + angular.toJson(project, true));
                        $http.put(REST.PROJECTS + '/' + project.Id, project)
                            .success(function(result) {
                                dfd.resolve(result);
                            })
                            .error(function(result, status) {
                                dfd.reject({result: result, status: status})
                            });

                        taskIntegrationService.updateAllTasks(project.Tasks);
                    }
                    return dfd.promise;
                }

                function deleteProject(project) {
                    var dfd = $q.defer();
                    $log.debug('DeleteProject: ' + angular.toJson(project, true));
                    $http.delete(REST.PROJECTS + '/' + project.Id, {tracker: 'rest'})
                        .success(function(result) {
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                }

                function getTestValue() {
                    return 42;
                }

                return {
                    createProject: createProject,
                    readProjects: readProjects,
                    deleteProject: deleteProject,
                    editProject: editProject,
                    updateProjects: updateProjects,
                    getTestValue: getTestValue
                };
            }]);
})();
