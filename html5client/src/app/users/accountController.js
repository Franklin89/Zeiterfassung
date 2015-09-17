(function () {
    'use strict';

    angular.module('zeiterfassung.users', ['zeiterfassung.users.integrationservices'])
        .controller('AccountController', ['$scope', '$state', 'UsersIntegrationService',
            function ($scope, $state, usersIntegrationService) {
                usersIntegrationService.readUserForId(0)
                    .then(function (result) {
                        $scope.account = JSON.parse(result);
                    }, function (reason) {
                        // show error message
                        return reason;
                    });
            }]);
})();
