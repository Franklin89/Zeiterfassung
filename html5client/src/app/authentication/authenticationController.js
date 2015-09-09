angular.module('zeiterfassung.authentication', ['zeiterfassung.authentication.integrationservices'])
    .controller('AuthenticationController', ['$scope', 'AuthenticationIntegrationService',
        function ($scope, authenticationIntegrationService) {
            $scope.login = function () {
                authenticationIntegrationService.login($scope.user)
                    .then(function (result) {
                        // authorized
                        alert(result.toString());
                    }, function (reason) {
                        // unauthorized
                    });
            }
    }]);
