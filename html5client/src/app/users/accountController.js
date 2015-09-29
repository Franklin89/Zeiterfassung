(function() {
    'use strict';

    angular.module(
        'zeiterfassung.users',
        ['zeiterfassung.users.integrationservices', 'zeiterfassung.authentication',
            'xeditable', 'angular-md5'])
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
                        swal('Oops...', 'Fehler beim Abfragen der Benutzer', 'error');
                        return reason;
                    });

                $scope.updateUser = function() {
                    usersIntegrationService.editUser($scope.account)
                        .then(function() {
                            // success
                            return true;
                        }, function(reason) {
                            // show error message
                            swal('Oops...', 'Fehler beim Editieren des Benutzers', 'error');
                            return reason;
                        });
                };
            }
        ])
        .controller(
        'UserController',
        ['$scope', '$state', 'UsersIntegrationService', 'md5',
            function($scope, $state, usersIntegrationService, md5) {
                function readUsers() {
                    usersIntegrationService.readUsers()
                        .then(function(result) {
                            // success
                            $scope.users = result;
                        }, function() {
                            swal('Oops...', 'Fehler beim Abrufen der Benutzer', 'error');
                        });
                }
                readUsers();

                $scope.deleteUser = function(user) {
                    swal({
                        title: 'Benutzer l\u00f6schen',
                        text:
                        'Soll der Benutzer ' + user.LastName + ' ' + user.FirstName + ' wirklich gel\u00f6scht werden?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ja, l\u00f6schen',
                        cancelButtonText: 'Nein',
                        closeOnConfirm: true
                    }, function() {
                        usersIntegrationService.deleteUser(user.Id).then(
                            function() {
                                readUsers();
                            },
                            function() {
                                swal('Oops...', 'Fehler beim L\u00f6schen des Benutzers', 'error');
                            }
                        );
                    });
                };

                $scope.addUser = function() {
                    usersIntegrationService.createUser({
                            FirstName: $scope.account.firstName,
                            LastName: $scope.account.lastName,
                            WorkingHoursPerDay: $scope.account.workingHoursPerDay,
                            Username: $scope.account.userName,
                            Email: $scope.account.email,
                            Password: md5.createHash($scope.account.password)
                        }
                    ).then(
                        function() {
                            readUsers();
                        },
                        function() {
                            swal('Oops...', 'Fehler beim Erstellen des Benutzers', 'error');
                        });
                };
            }
        ]);
})();
