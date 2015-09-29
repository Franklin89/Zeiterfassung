(function() {
    'use strict';

    describe('Project Erfassung - Test', function() {

        var pageToTestUrl, testUser, taskToAddName, testUserPwd, projectToAddName;

        beforeAll(function() {
            pageToTestUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/login';
            testUser = 'Admin';
            testUserPwd = 'Admin1234!';
            projectToAddName = 'ShivaProject';
            taskToAddName = 'ShivasTask';
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
            //Choose project to Add Task
            element(by.id('dropdownMenu1')).click();
            browser.waitForAngular();
            element(by.id('dropdownMenuMenu')).all(by.repeater('project in projects')).last().click();
            browser.waitForAngular();
            element(by.id('tasknameInput')).sendKeys(taskToAddName);
            element(by.id('tasknameInputSubmit')).click();
            browser.waitForAngular();
        });

        afterAll(function() {
            var newProject, deleteButton;
            newProject = element.all(by.repeater('project in projects')).last();
            deleteButton = newProject.element(by.css('td > div > a'));
            deleteButton.click();
            browser.waitForAngular();
        });

        it('should find the created Task', function() {
            var newProject, newTask, inputText;
            newProject = element.all(by.repeater('project in projects')).last();
            newTask = newProject.all(by.repeater('task in project.Tasks')).last();
            inputText = newTask.element(by.model('task.Name'));
            expect(inputText.getAttribute('value')).toEqual(taskToAddName);
        });

        it('should not display the project delete button', function() {
            var newProject;
            newProject = element.all(by.repeater('project in projects')).last();
            newProject.element(by.css('td > div > a')).isDisplayed().then(function(displayed) {
                expect(displayed).toBe(false);
            });
        });

        it('should delete the the task', function() {
            var newProject, newTask, deleteButton;
            browser.waitForAngular();
            newProject = element.all(by.repeater('project in projects')).last();
            newTask = newProject.all(by.repeater('task in project.Tasks')).last();
            deleteButton = newTask.element(by.css('div a'));
            deleteButton.click();
            browser.waitForAngular();
            newProject = element.all(by.repeater('project in projects')).last();
            expect(newProject.all(by.repeater('task in project.Tasks')).count()).toBe(0);
        });
    });
})();
