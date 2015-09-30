(function() {
    'use strict';

    angular.module(
            'zeiterfassung.project',
            ['zeiterfassung.project.integrationservices',
                'zeiterfassung.ui.app.constants',
                'zeiterfassung.task.integrationservices',
                'zeiterfassung.userTasks.integrationservices'])
        .controller(
            'ProjectController',
            ['$scope',
                'ProjectIntegrationService',
                '$timeout',
                'TaskIntegrationService',
                function($scope, projectIntegrationService, $timeout, taskIntegrationService) {

                    $scope.noProjectSelected = false;
                    $scope.projectNameInvalid = false;
                    $scope.projectInserted = false;
                    $scope.tasknameInvalid = false;
                    $scope.taskInserted = false;
                    $scope.changesDetected = false;
                    $scope.showSuccessAtTopOfPage = false;
                    $scope.showFailureAtTopOfPage = false;
                    $scope.dropdownDisplay = 'Projekt auswählen';

                    var projectId, readProjects;

                    readProjects = function() {
                        projectIntegrationService.readProjects().then(function(result) {
                            $scope.projects = result;
                        }, function() {
                            $scope.errorMessage = 'Netzwerkfehler';
                            $scope.showFailureAtTopOfPage = true;

                            $timeout(function() {
                                $scope.showFailureAtTopOfPage = false;
                            }, 2000);
                        });
                    };

                    $scope.addProject = function() {

                        if ($scope.projectname === undefined) {
                            $scope.projectNameInvalid = true;
                        }
                        else {

                            $scope.projectInserted = true;

                            $scope.projectNameInvalid = false;
                            projectIntegrationService.createProject({
                                    Name: $scope.projectname
                                }
                            ).then(
                                function() {
                                    $scope.projectInserted = true;
                                    $timeout(function() {
                                        $scope.projectInserted = false;
                                    }, 2000);
                                    $scope.projectname = '';
                                    readProjects();
                                },
                                function() {
                                    $scope.errorMessage = 'Fehler beim Erstellen des Projekts';
                                    $scope.showFailureAtTopOfPage = true;

                                    $timeout(function() {
                                        $scope.showFailureAtTopOfPage = false;
                                    }, 2000);
                                });
                        }
                    };

                    $scope.dropDownSelected = function(projectIdofSelectedItem, projectName) {
                        projectId = projectIdofSelectedItem;
                        $scope.dropdownDisplay = projectName;
                    };

                    $scope.insertTask = function() {

                        $scope.noProjectSelected = $scope.dropdownDisplay === 'Projekt auswählen';

                        $scope.tasknameInvalid = $scope.taskname === undefined || $scope.taskname === '';

                        if ($scope.taskname !== undefined && $scope.dropdownDisplay !== 'Projekt auswählen') {
                            var taskToInsert = {
                                Name: $scope.taskname,
                                ProjectId: projectId
                            };

                            taskIntegrationService.createTask(taskToInsert).then(
                                function() {
                                    $scope.taskInserted = true;
                                    $timeout(function() {
                                        $scope.taskInserted = false;
                                    }, 2000);
                                    $scope.taskname = '';
                                    readProjects();
                                },
                                function() {
                                    $scope.errorMessage = 'Fehler beim Einfügen der Tätigkeit';
                                    $scope.showFailureAtTopOfPage = true;

                                    $timeout(function() {
                                        $scope.showFailureAtTopOfPage = false;
                                    }, 2000);
                                });
                        }
                    };

                    $scope.deleteTask = function(task) {
                        taskIntegrationService.deleteTask(task).
                            then(function() {
                                $scope.successMeassage = 'Die Tätigkeit wurde erfolgreich gelöscht';
                                $scope.showSuccessAtTopOfPage = true;

                                $timeout(function() {
                                    $scope.showSuccessAtTopOfPage = false;
                                }, 2000);
                                readProjects();
                            }, function() {
                                $scope.errorMessage = 'Fehler beim Löschen der Tätigkeit';
                                $scope.showFailureAtTopOfPage = true;

                                $timeout(function() {
                                    $scope.showFailureAtTopOfPage = false;
                                }, 2000);
                            });
                    };

                    $scope.inputChanged = function() {
                        $scope.changesDetected = true;
                    };

                    $scope.saveAllProjects = function() {
                        projectIntegrationService.updateProjects($scope.projects)
                            .then(function() {
                                $scope.successMeassage = 'Projekte und Tätigkeiten erfolgreich geändert';
                                $scope.showSuccessAtTopOfPage = true;

                                $timeout(function() {
                                    $scope.showSuccessAtTopOfPage = false;
                                }, 2000);
                            }, function() {
                                $scope.errorMessage = 'Fehler beim Aktualisieren der Tätigkeiten und Projekte';
                                $scope.showFailureAtTopOfPage = true;

                                $timeout(function() {
                                    $scope.showFailureAtTopOfPage = false;
                                }, 2000);
                            });
                    };

                    $scope.deleteProject = function(project) {
                        projectIntegrationService.deleteProject(project).then(
                            function() {
                                $scope.successMeassage = 'Das Projekt ' + project.Name +
                                ' wurde erfolgreich gelöscht';
                                $scope.showSuccessAtTopOfPage = true;
                                $timeout(function() {
                                    $scope.showSuccessAtTopOfPage = false;
                                }, 2000);
                                readProjects();
                            },
                            function() {
                                $scope.errorMessage = 'Fehler beim Löschen des Projekts ' +
                                project.Name;
                                $scope.showFailureAtTopOfPage = true;

                                $timeout(function() {
                                    $scope.showFailureAtTopOfPage = false;
                                }, 2000);
                            });
                    };
                    readProjects();
                }]);
})();
