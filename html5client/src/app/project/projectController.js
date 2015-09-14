/**
 * Created by Kiwi on 07.09.15.
 */

(function () {

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('ProjectController', ['$scope', 'ProjectIntegrationService', '$timeout', 'TaskIntegrationService',
        function ($scope, projectIntegrtionService, $timeout, taskIntegrationService) {

            $scope.projects;
            $scope.noProjectSelected = false;
            $scope.projectNameInvalid = false;
            $scope.projectInserted = false;
            $scope.tasknameInvalid = false;
            $scope.taskInserted = false;
            $scope.networkErrorOccured = false;
            $scope.changesDetected = false;
            $scope.dropdownDisplay = "Select a project";

            var projectId;

            var readProjects = function () {
                projectIntegrtionService.readPojects().then(function (result) {
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
                    projectIntegrtionService.createProject({
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

            $scope.dropDownSelected = function (projectIdofSelectedItem, projectName) {
                projectId = projectIdofSelectedItem;
                $scope.dropdownDisplay = projectName;
            };


            $scope.insertTask = function () {

                if ($scope.dropdownDisplay === "Select a project") {
                    $scope.noProjectSelected = true;
                }
                else {
                    $scope.noProjectSelected = false;
                }

                if ($scope.taskname === undefined || $scope.taskname === '') {
                    $scope.tasknameInvalid = true;
                }
                else {
                    $scope.tasknameInvalid = false;
                }

                if ($scope.taskname !== undefined && $scope.dropdownDisplay !== "Select a project") {
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
                }
                ;
            };

            $scope.deleteTask = function(task){
                taskIntegrationService.deleteTask(task).
                    then(function(){
                        alert("Task wurde erfolgreich gelöscht");
                        readProjects();
                    })
            };

            $scope.inputChanged = function(){
                $scope.changesDetected = true;
            };

            $scope.saveAllProjects = function(){
                projectIntegrtionService.updateProjects($scope.projects)
                    .then(function(){
                       alert("Alle Projekte wurden erfolgreich upgedatet");
                    });
            };

            readProjects();
        }]);
})();