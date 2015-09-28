(function () {
    'use strict';
    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller("TimeRecordingController", ['$scope', 'ProjectIntegrationService',
        'UsersIntegrationService', 'AuthenticationIntegrationService', 'localStorageService', 'UserTaskIntegrationService',
        function ($scope, projectIntegrationService, userIntegrationService, authService,
                  localStorageService, userTaskIntegrationService) {

            $scope.dropdownProjectDisplay = "Bitte wähle ein Projekt";
            $scope.dropdownTaskDisplay = "Bitte wähle eine Tätigkeit";
            var projectId;
            var taskId;
            var user;

            var readProjects = function () {
                projectIntegrationService.readProjects().
                    then(function (result) {
                        $scope.projects = result;
                    },
                    function () {
                        swal("Oops...", "Fehler beim Lesen der Projekte!", "error");
                    });
            };

            var readUsersByName = function () {
                userIntegrationService.readByUserName(getUserNameFromLocalStorage()).
                    then(function (result) {
                        user = result;
                        console.log("Hier kommt der User" + angular.toJson(user));
                    },
                    function () {
                        swal("Oops...", "Fehler beim Lesen der Benutzer!", "error");
                    });
            };

            var getUserNameFromLocalStorage = function(){
                return authService.currentUsername();
            };

            $scope.projectDropDownSelected = function (projectIdofSelectedItem) {
                $scope.tasks = $scope.projects[projectIdofSelectedItem-1].Tasks;
                $scope.dropdownProjectDisplay = $scope.projects[projectIdofSelectedItem-1].Name;
                projectId = $scope.projects[projectIdofSelectedItem-1].Id;
            };

            $scope.taskDropDownSelected = function(task){
                $scope.dropdownTaskDisplay = task.Name;
                taskId = task.Id;
            };

            $scope.addUserTask = function(){
                var dateAsArray = $scope.date.split(".");
                var date = new Date(dateAsArray[2], dateAsArray[1], dateAsArray[0]);

                var userTaskToAdd = {
                    "Date": date,
                    "ProjectId": projectId,
                    "TaskId": taskId,
                    "Time": $scope.time,
                    "UserId": user.Id
                };

                userTaskIntegrationService.createUserTask(userTaskToAdd)
                    .then(function(){
                        swal("Good job!", "Deine Zeit wurde erfolgreich hinzugefügt!", "success");
                    }, function(){
                        swal("Oops...", "Leider konnte die Arbeitszeit nicht hinzugefügt werden!", "error");
                    });

                console.log(angular.toJson(userTaskToAdd));
            };

            readProjects();
            readUsersByName();
        }]);
})();
