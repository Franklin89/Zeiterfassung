(function() {
    'use strict';

    describe('Test for AuthentificationController', function() {

        var authRequestHandler, $httpBackend, REST, $rootScope, createController, md5;

        beforeEach(module('zeiterfassung.ui'));

        beforeEach(inject(function($injector, _REST_, _md5_) {
            var $controller;

            $httpBackend = $injector.get('$httpBackend');
            REST = _REST_;
            md5 = _md5_;

            authRequestHandler = $httpBackend.when('POST', REST.ACCOUNT)
                .respond({
                    Username: 'Admin',
                    PasswordHash: md5.createHash('Admin1234!')
                });

            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');

            console.log(authRequestHandler);
            createController = function() {
                return $controller('AuthenticationController', {$scope: $rootScope});
            };
        }));

        afterEach(function() {
            //$httpBackend.verifyNoOutstandingExpectation();
            //$httpBackend.verifyNoOutstandingRequest();
            //$httpBackend = null;
        });

        it('should fetch authentication token', function() {
            var result, controller;
            result = $httpBackend.expectGET('/account');
            console.log(result.respond());
            controller = createController();
            console.log(controller);
            $httpBackend.flush();
        });

        /*it('should fail authentication', function() {
            authRequestHandler.respond(401, '');

            $httpBackend.expectPOST('/account');
            var controller = createController();
            $httpBackend.flush();
            expect($scope.status).toBe('Failed...');
        });*/
    });
})();
