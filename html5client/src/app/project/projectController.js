angular.module('zeiterfassung.project', ['zeiterfassung.project.integrationservices', 'zeiterfassung.task.integrationservices'])
    .controller('ProjectController', ['$scope', 'ProjectIntegrationService', '$timeout', 'TaskIntegrationService',
        function ($scope, projectIntegrationService, $timeout, taskIntegrationService) {

            $scope.projectNameInvalid = false;
            $scope.projectInserted = false;
            $scope.tasknameInvalid = false;
            $scope.taskInserted = false;
            $scope.networkErrorOccured = false;
            $scope.dropdownDisplay = "Select a project";

            var projectId;

            var readProjects = function () {
                projectIntegrationService.readPojects().then(function (result) {
                    $scope.projects = result;
                });
            };

            $scope.addProject = function () {

                if ($scope.projectname == undefined) {
                    $scope.projectNameInvalid = true;
                }
                else {

                    $scope.projectInserted = true;

                    $scope.projectNameInvalid = false;
                    projectIntegrationService.createProject({
                            "Name": $scope.projectname
                        }
                    ).success(function () {
                            $scope.projectInserted = true;
                            $timeout(function () {
                                $scope.projectInserted = false;
                            }, 2000);
                        }).error(function () {
                            $scope.networkErrorOccured = true;
                        });
                    $timeout(readProjects, 1000);
                }
            };


            $scope.addTask = function () {
                if ($scope.taskname == undefined) {
                    $scope.tasknameInvalid = true;
                }
                else {
                    $scope.taskInserted = true;

                    $scope.tasknameInvalid = false;


                }
            };

            $scope.dropDownSelected = function (projectIdofSelectedItem, projectName) {
                projectId = projectIdofSelectedItem;
                $scope.dropdownDisplay = projectName;
            };


            $scope.insertTask = function () {
                var taskToInsert = {
                    "Name": $scope.taskname,
                    "ProjectId": projectId
                };

                taskIntegrationService.createTask(taskToInsert).success(function () {
                    $scope.taskInserted = true;
                    $timeout(function () {
                        $scope.taskInserted = false;
                    }, 2000);
                }).error(function () {
                    $scope.networkErrorOccured = true;
                });
            };
            readProjects();
        }
    ]);
