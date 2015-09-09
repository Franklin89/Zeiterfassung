/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('ProjectController',['$scope', 'ProjectIntegrationService', '$timeout',
        function ($scope, projectIntegrtionService, $timeout) {

        $scope.projects;
        $scope.projectNameInvalid = false;
        $scope.projectInserted = false;

        var readProjects = function() {
            projectIntegrtionService.readPojects().then(function (result) {
                $scope.projects = result;
            });
        };

        $scope.addProject = function () {

            if($scope.projectname == undefined){
                $scope.projectNameInvalid = true;
            }
            else {

                $scope.projectInserted = true;

                $scope.projectNameInvalid = false;
                projectIntegrtionService.createProject({
                        "Name": $scope.projectname
                    }
                ).then(function(){
                        $scope.projectInserted = true;
                        $timeout(function(){
                            $scope.projectInserted = false;
                        }, 2000);
                    });
                $timeout(readProjects, 1000);
            }
        };
        readProjects();
    }]);
})();