/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('ProjectController',['$scope', 'ProjectIntegrationService',
        function ($scope, projectIntegrtionService) {

        $scope.projects;

        projectIntegrtionService.readPojects().then(function(result){
            $scope.projects = result;
        });

        $scope.addProject = function () {
            $scope.projects.push({
                name: "New Project",
                duration: "999",
                description: "Added project"
            });
        }
    }]);
})();