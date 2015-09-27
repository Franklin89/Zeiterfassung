(function() {
    'use strict';

    angular.module('zeiterfassung.authentication',
        ['zeiterfassung.authentication.integrationservices'])
        .controller('AuthenticationController', ['$scope', '$state', 'AuthenticationIntegrationService',
            function($scope, $state, authenticationIntegrationService) {
                $scope.login = function() {
                    $scope.error = '';
                    authenticationIntegrationService.login($scope.user)
                        .then(function(result) {
                            // authorized
                            if (authenticationIntegrationService.isAdmin()) {
                                $state.go('statistics');
                            }
                            else {
                                $state.go('timeRecording');
                            }
                            return result;
                        }, function(reason) {
                            // unauthorized
                            $scope.user.password = '';
                            $scope.error = 'Login fehlgeschlagen';
                            return reason;
                        });
                };
            }]);
})();
