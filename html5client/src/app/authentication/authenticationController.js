angular.module('zeiterfassung.authentication', ['zeiterfassung.authentication.integrationservices'])
    .controller('AuthenticationController', ['$scope', '$state', 'AuthenticationIntegrationService',
        function ($scope, $state, authenticationIntegrationService) {
            $scope.login = function () {
                authenticationIntegrationService.login($scope.user)
                    .then(function (result) {
                        // authorized
                        alert('Login succesful!');
                        $state.go('timeRecording');
                    }, function (reason) {
                        // unauthorized
                        alert('Login failed! Try again..');
                    });
            }
        }]);
