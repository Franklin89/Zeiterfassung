/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('TaskController', ['$scope', 'TaskIntegrationService', function ($scope, taskIntegrationService) {
        $scope.tasks = taskIntegrationService.readTasks();

    }]);
})();