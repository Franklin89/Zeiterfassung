/**
 * Created by Kiwi on 19.09.15.
 */

(function () {

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller("TimeRecordingController", ['$scope', 'ProjectIntegrationService',
        function ($scope, projectIntegrationService) {

            $scope.dropdownProjectDisplay = "Bitte wähle ein Projekt";
            $scope.dropdownTaskDisplay = "Bitte wähle einen Task";

            var readProjects = function () {
                projectIntegrationService.readPojects().
                    then(function (result) {
                        $scope.projects = result;
                    },
                    function () {
                        alert("Error beim Lesen der Projekte");
                    });
            };

            $scope.projectDropDownSelected = function (projectIdofSelectedItem) {
                $scope.tasks = $scope.projects[projectIdofSelectedItem].Tasks;
                $scope.dropdownProjectDisplay = $scope.projects[projectIdofSelectedItem].Name;
            };

            $scope.taskDropDownSelected = function(task){
                $scope.dropdownTaskDisplay = task.Name;
            };

            $scope.addUserTask = function(){
                alert("You want to add a userTask");
            };

            readProjects();
        }]);
})();