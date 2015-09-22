(function() {
    'use strict';

    angular.module('zeiterfassung.authentication',
        ['zeiterfassung.authentication.integrationservices', 'angular-loading-bar'])
        .controller('AuthenticationController', ['$scope', '$state', 'AuthenticationIntegrationService',
            function($scope, $state, authenticationIntegrationService) {
                $scope.login = function() {
                    authenticationIntegrationService.login($scope.user)
                        .then(function(result) {
                            // authorized
                            if (authenticationIntegrationService.isAdmin()) {
                                $state.go('projectManagement');
                            }
                            else {
                                $state.go('timeRecording');
                            }
                            return result;
                        }, function(reason) {
                            // unauthorized
                            return reason;
                        });
                };
            }]);
})();
