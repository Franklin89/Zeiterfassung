angular.module('zeiterfassung.authentication', ['zeiterfassung.authentication.integrationservices'])
    .controller('AuthenticationController', ['$scope', '$state', 'AuthenticationIntegrationService',
        function ($scope, $state, authenticationIntegrationService) {
            $scope.login = function () {
                authenticationIntegrationService.login($scope.user)
                    .then(function (result) {
                        // authorized
                        $state.go('timeRecording');
                    }, function (reason) {
                        // unauthorized
                        //TODO: display error message
                    });
            }
        }]);
