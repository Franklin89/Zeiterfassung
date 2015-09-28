(function() {
    'use strict';

    describe('Test Project Integration Service', function() {

        beforeEach(module('zeiterfassung.ui'));

        var ProjectIntegrationService, projectSpecification, tasks, $httpBackend, $log, REST, postResponder, $q;

        beforeEach(inject(function(_ProjectIntegrationService_, _$httpBackend_, _$log_, _REST_, _$q_) {
            ProjectIntegrationService = _ProjectIntegrationService_;
            $httpBackend = _$httpBackend_;
            $log = _$log_;
            REST = _REST_;
            $q = _$q_;
        }));

        beforeEach(function() {
            projectSpecification = {
                Name: 'GoanersPilzliProject'
            };
            tasks = {

            };
        });

        afterEach(function() {
            ProjectIntegrationService = null;
            projectSpecification = null;
            tasks = null;
            $httpBackend = null;
            $log = null;
            REST = null;
            postResponder = null;
        });

        function logCatch(err) {
            $log.debug(JSON.stringify(err.toString()));
            $log.debug(err.stack);
            return $q.reject(err);
        }

        postResponder = function(m, url, data, headers) {
            console.log(m);
            console.log(url);
            console.log(data);
            console.log(headers);
            return [201, data, headers];
        };

        it('initialization must work', function() {
            expect(ProjectIntegrationService).toBeDefined();
        });

        describe('Test Create Project', function() {

            beforeEachAsync(function() {
                //return ProjectIntegrationService.createProject(projectSpecification);
                $httpBackend.expectPOST(REST.PROJECTS).respond(postResponder);
                //remove, following line just for jshint
                logCatch({});
            });

            //itAsync('Should have createt a project', function () {
            // $httpBackend.expectPOST(REST.PROJECTS).respond(postResponder);
            //return ProjectIntegrationService.readPojects().then(function(result) {
            //    expect(result).toBeDefined();
            //});
            //});
        });
    });
})();
