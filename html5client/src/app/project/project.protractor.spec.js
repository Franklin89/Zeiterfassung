(function() {
    'use strict';

    describe('Project Erfassung - Test', function() {

        var pageToTestUrl, testUser, testUserPwd, projectToAddName, projectName, deleteButton;

        beforeAll(function() {
            pageToTestUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/login';
            testUser = 'Admin';
            testUserPwd = 'Admin1234!';
            projectToAddName = 'Spacetribute';
            browser.get(pageToTestUrl);
            element(by.id('username')).sendKeys(testUser);
            element(by.id('password')).sendKeys(testUserPwd);
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            element(by.id('menuProjectManagement')).click();
            browser.waitForAngular();
            element(by.id('projectNameInput')).sendKeys(projectToAddName);
            element(by.id('addButton')).click();
            browser.waitForAngular();
        });

        beforeEach(function() {
            var inputText, row;
            row = element.all(by.repeater('project in projects')).last();
            inputText = row.element(by.model('project.Name'));
            projectName = inputText.getAttribute('value');
            deleteButton = row.element(by.css('div a'));
        });

        it('should test the addition of a Project', function() {
            expect(projectName).toEqual(projectToAddName);
        });

        it('should test the remove of a Project', function() {
            var inputText, projectName, row;
            deleteButton.click();
            browser.waitForAngular();
            row = element.all(by.repeater('project in projects')).last();
            if (row) {
                inputText = row.element(by.model('project.Name'));
                projectName = inputText.getAttribute('value');
                expect(projectName).not.toEqual(projectToAddName);
            }
        });
    });
})();
