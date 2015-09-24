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
                usersIntegrationService.readByUserName(authenticationIntegrationService.currentUsername())
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
        ])
        .controller(
        'UserController',
        ['$scope', '$state', 'UsersIntegrationService',
            function($scope, $state, usersIntegrationService) {
                usersIntegrationService.readUsers()
                        .then(function(result) {
                            // success
                            $scope.users = result;
                        }, function() {
                            // TODO:show error message
                        });

                $scope.deleteUser = function(user) {
                    swal({
                        title: 'Benutzer l\u00f6schen',
                        text: 'Soll der Benutzer ' + user.LastName + ' ' + user.FirstName + ' wirklich gel\u00f6scht werden?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ja, l\u00f6schen',
                        cancelButtonText: 'Nein',
                        closeOnConfirm: true
                    }, function() {
                        usersIntegrationService.deleteUser(user.Id);
                    });
                };
            }
        ]);
})();
