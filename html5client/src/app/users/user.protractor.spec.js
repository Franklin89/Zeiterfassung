(function() {
    'use strict';

    describe('Over- All- Flow Test', function() {

        var adminUserName, adminUserPwd, newUserName, newUserEmail, newUserPwd, loginPageUrl, timeRecordingUrl,
            statisticsUrl, accountSettingsUrl, newProjectName, projectTaskCodingName, holidayTaskName, meetingTaskName,
            userAdministrationUrl, newUserWorkingHours;

        beforeAll(function() {
            adminUserName = 'Admin';
            adminUserPwd = 'Admin1234!';
            newUserName = 'nschaerer';
            newUserEmail = 'new.user@incredibals.ch';
            newUserPwd = 'Test1234!';
            newUserWorkingHours = '8';
            loginPageUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/login';
            timeRecordingUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/timeRecording';
            statisticsUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/statistics';
            accountSettingsUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/account';
            userAdministrationUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/userManagement';

            newProjectName = 'Flow- Test- Project';
            projectTaskCodingName = 'Programmieren';
            holidayTaskName = 'Ferien';
            meetingTaskName = 'Sitzungen';

            browser.get(loginPageUrl);
        });

        it('should log in the Administrator', function(){
            element(by.id('username')).sendKeys(adminUserName);
            element(by.id('password')).sendKeys(adminUserPwd);
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(statisticsUrl);
        });

        it('should route the Admin to the User Administration Page', function(){
            element(by.id('menuUserAdministration')).click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(userAdministrationUrl);
        });

        it('should add a new User', function() {

        });

        it('should log out the Admin User', function(){
            var alerter;
            element(by.id('menuLogout')).click();
            browser.waitForAngular();
            alerter = element(by.css('.sweet-alert'));
            alerter.element(by.css('.confirm')).click();
            browser.waitForAngular();
            browser.get(loginPageUrl);
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(loginPageUrl);
        });

        it('it should login the newly created user', function(){
            element(by.id('username')).sendKeys(newUserName);
            element(by.id('password')).sendKeys(newUserPwd);
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(timeRecordingUrl);
        });
    });
})();
