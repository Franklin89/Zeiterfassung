(function() {
    'use strict';
    angular.module(
        'zeiterfassung.timeRecording', [
            'zeiterfassung.project.integrationservices',
            'zeiterfassung.users.integrationservices',
            'zeiterfassung.authentication.integrationservices',
            'LocalStorageModule',
            'zeiterfassung.userTasks.integrationservices'
        ])
        .controller(
            'TimeRecordingController', [
                '$scope',
                'ProjectIntegrationService',
                'UsersIntegrationService',
                'AuthenticationIntegrationService',
                'localStorageService',
                'UserTaskIntegrationService',
                function($scope,
                         projectIntegrationService,
                         userIntegrationService,
                         authService,
                         localStorageService,
                         userTaskIntegrationService) {

                    var projectId, taskId, user, readProjects, readUsersByName, getUserNameFromLocalStorage;

                    $scope.dropdownProjectDisplay = 'Bitte wähle ein Projekt';
                    $scope.dropdownTaskDisplay = 'Bitte wähle eine Tätigkeit';

                    readProjects = function() {
                        projectIntegrationService.readProjects().then(
                            function(result) {
                                $scope.projects = result;
                            },
                            function() {
                                swal('Oops...', 'Fehler beim Lesen der Projekte!', 'error');
                            });
                    };

                    readUsersByName = function() {
                        userIntegrationService.readByUserName(getUserNameFromLocalStorage()).then(
                            function(result) {
                                user = result;
                            },
                            function() {
                                swal('Oops...', 'Fehler beim Lesen der Benutzer!', 'error');
                            });
                    };

                    getUserNameFromLocalStorage = function() {
                        return authService.currentUsername();
                    };

                    $scope.projectDropDownSelected = function(projectIdofSelectedItem) {
                        $scope.tasks = $scope.projects[projectIdofSelectedItem - 1].Tasks;
                        $scope.dropdownProjectDisplay = $scope.projects[projectIdofSelectedItem - 1].Name;
                        projectId = $scope.projects[projectIdofSelectedItem - 1].Id;
                    };

                    $scope.taskDropDownSelected = function(task) {
                        $scope.dropdownTaskDisplay = task.Name;
                        taskId = task.Id;
                    };

                    $scope.addUserTask = function() {
                        var dateAsArray, date, userTaskToAdd;
                        dateAsArray = $scope.date.split('.');
                        date = new Date(Date.UTC(dateAsArray[2], dateAsArray[1] - 1, dateAsArray[0]));

                        userTaskToAdd = {
                            Date: date.toISOString(),
                            ProjectId: projectId,
                            TaskId: taskId,
                            Time: $scope.time,
                            UserId: user.Id
                        };

                        userTaskIntegrationService.createUserTask(userTaskToAdd).then(
                            function() {
                                swal('Good job!', 'Deine Zeit wurde erfolgreich hinzugefügt!', 'success');
                            },
                            function() {
                                swal('Oops...', 'Leider konnte die Arbeitszeit nicht hinzugefügt werden!', 'error');
                            });

                        console.log(angular.toJson(userTaskToAdd));
                    };

                    readProjects();
                    readUsersByName();
                }]);
})();
