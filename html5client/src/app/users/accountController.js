(function() {
    'use strict';

    angular.module(
        'zeiterfassung.users',
        ['zeiterfassung.users.integrationservices', 'zeiterfassung.authentication', 'xeditable'])
        .run(function(editableOptions) {
            editableOptions.theme = 'bs3';
        })
        .controller(
            'AccountController',
            ['$scope', '$state', 'UsersIntegrationService', 'AuthenticationIntegrationService',
            function($scope, $state, usersIntegrationService, authenticationIntegrationService) {
                usersIntegrationService.getUserByUsername(authenticationIntegrationService.currentUsername())
                    .then(function(result) {
                        $scope.account = result;
                    }, function(reason) {
                        // show error message
                        return reason;
                    });

                $scope.updateUser = function() {
                    usersIntegrationService.editUser($scope.account)
                        .then(function() {
                            // success
                            return true;
                        }, function(reason) {
                            // show error message
                            return reason;
                        });
                };
            }
        ]);
})();
