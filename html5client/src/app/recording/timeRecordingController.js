/**
 * Created by Kiwi on 19.09.15.
 */

(function () {

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller("TimeRecordingController", ['$scope', 'ProjectIntegrationService',
        'UsersIntegrationService', 'AuthenticationIntegrationService', 'localStorageService', 'UserTaskIntegrationService',
        function ($scope, projectIntegrationService, userIntegrationService, authService,
                  localStorageService, userTaskIntegrationService) {

            $scope.dropdownProjectDisplay = "Bitte wähle ein Projekt";
            $scope.dropdownTaskDisplay = "Bitte wähle einen Task";
            var projectId;
            var taskId;
            var user;

            var readProjects = function () {
                projectIntegrationService.readProjects().
                    then(function (result) {
                        $scope.projects = result;
                    },
                    function () {
                        alert("Error beim Lesen der Projekte");
                    });
            };

            var readUsersByName = function () {
                userIntegrationService.readByUserName(getUserNameFromLocalStorage()).
                    then(function (result) {
                        user = result;
                        console.log("Hier kommt der User" + angular.toJson(user));
                    },
                    function () {
                        alert("Error beim Lesen der User");
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
                        alert("User Task erfolgreich hinzugefügt.");
                    }, function(){
                        alert("Leider konnte der User Task nicht hinzugefügt werden.")
                    });

                console.log(angular.toJson(userTaskToAdd));

            };

            readProjects();
            readUsersByName();
        }]);
})();