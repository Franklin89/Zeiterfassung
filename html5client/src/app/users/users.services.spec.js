(function() {
    'use strict';

    describe('Test UserIntegration Service', function() {

        beforeEach(module('zeiterfassung.ui'));

        var userIntegrationService, userDefinition;

        beforeEach(inject(function(UsersIntegrationService) {
            userIntegrationService = UsersIntegrationService;
        }));

        beforeEach(function() {
            userDefinition = {
                FirstName: 'Test Goa',
                LastName: 'Goaner',
                Email: 'goaner@atmos.goa',
                Password: 'space',
                WorkingHoursPerDay: 6.1,
                userName: 'GoanersAtmos'
            };
        });

        afterEach(function() {
            userIntegrationService = null;
            userDefinition = null;
        });

        xit('initialization must work', function() {
            expect(userIntegrationService).toBeDefined();
        });

        describe('Test Create User', function() {
            var users;

            beforeEach(function() {
                var t = userIntegrationService.createUserNew(userDefinition);
                console.log('unrsolved Result ' + t);
                t.then(function(result) {
                    console.log('resolved Result ' + result);
                    userIntegrationService.readUsers().then(function(result) {
                        users = result;
                    });
                });
            });

            xit('Should have createt a user', function() {
                console.log(users);
                expect(users).toBeDefined();
                //expect(user).toBeDefined();
            });
        });

        xit('read all users', function() {
            var users, p = userIntegrationService.readUsers();
            console.log(p);
            p.then(function(result) {
                users = result;
            }).catch(function(error) {
                return error;
            });
            expect(users).toBeDefined();
        });
    });
})();
