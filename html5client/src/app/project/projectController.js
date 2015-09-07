/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('ProjectController', function ($scope) {
        $scope.projects = [
            {
                name: "Testproject",
                duration: "2",
                description: "Testdescription"
            },
            {
                name: "Altova",
                duration: "4",
                description: "Testdescription"
            },
            {
                name: "Game 456",
                duration: "2",
                description: "Testdescription"
            },
            {
                name: "App 321",
                duration: "2",
                description: "Testdescription"
            }
        ];

        $scope.addProject = function () {
            $scope.projects.push({
                name: "New Project",
                duration: "999",
                description: "Added project"
            });
        }
    });
})();