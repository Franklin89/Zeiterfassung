(function () {
    'use strict';
    angular.module(
        'zeiterfassung.timeRecording',
        ['zeiterfassung.project.integrationservices', 'zeiterfassung.users.integrationservices',
            'zeiterfassung.authentication.integrationservices', 'LocalStorageModule',
            'zeiterfassung.userTasks.integrationservices'])
        .controller("TimeRecordingController", ['$scope', 'ProjectIntegrationService',
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
                var date = new Date(Date.UTC(dateAsArray[2], dateAsArray[1]-1, dateAsArray[0]));

                var userTaskToAdd = {
                    "Date": date.toISOString(),
                    "ProjectId": projectId,
                    "TaskId": taskId,
                    "Time": $scope.time,
                    "UserId": user.Id
                };

                userTaskIntegrationService.createUserTask(userTaskToAdd)
                    .then(function(){
                        swal("Good job!", "Deine Zeit wurde erfolgreich hinzugefügt!", "success");
                        var newDate = new Date();
                        newDate.setDate(date.getDate() + 1);
                        $scope.date = newDate.toLocaleDateString();
                    }, function(){
                        swal("Oops...", "Leider konnte die Arbeitszeit nicht hinzugefügt werden!", "error");
                    });

                console.log(angular.toJson(userTaskToAdd));
            };

            readProjects();
            readUsersByName();
        }])
        .directive('datepicker', function() {
            return function(scope, element, attrs) {
                element.datepicker({
                    format: 'dd.mm.yyyy'
                });
            }
        });
})();
