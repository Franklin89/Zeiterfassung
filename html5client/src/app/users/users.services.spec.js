(function() {
    'use strict';

    describe('Test UserIntegration Service', function() {

        beforeEach(module('zeiterfassung.ui'));

        var userIntegrationService, userDefinition;

        beforeEach(inject(function(UsersIntegrationService) {
            userIntegrationService = UsersIntegrationService;
            userDefinition = {
                FirstName: 'Test Goa',
                LastName: 'Goaner',
                Email: 'goaner@atmos.goa',
                Password: 'space',
                WorkingHoursPerDay: 6.1,
                userName: 'GoanersAtmos'
            };
        }));

        afterEach(function() {
            userIntegrationService = null;
        });

        it('initialization must work', function() {
            expect(userIntegrationService).toBeDefined();
        });

        xit('Create a user', function() {
            var user;

            userIntegrationService.createUser(userDefinition)
                .then(function(result) {
                    user = result;
                });
            expect(user).toBeDefined();
        });

        it('read all users', function() {
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
