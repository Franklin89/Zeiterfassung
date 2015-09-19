(function () {
    'use strict';

    angular.module('zeiterfassung.users', ['zeiterfassung.users.integrationservices', 'zeiterfassung.authentication'])
        .controller('AccountController', ['$scope', '$state', 'UsersIntegrationService', 'AuthenticationIntegrationService',
            function ($scope, $state, usersIntegrationService, authenticationIntegrationService) {
                usersIntegrationService.getUserByUsername(authenticationIntegrationService.currentUsername())
                    .then(function (result) {
                        $scope.account = result;
                    }, function (reason) {
                        // show error message
                        return reason;
                    });
            }]);
})();
