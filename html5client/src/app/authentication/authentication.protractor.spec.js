(function() {
    'use strict';

    describe('Zeiterfassung Login- Test', function() {

        var pageToTestUrl, targetUrl, testUser, testUserPwd, failedPwd;

        beforeAll(function() {
            pageToTestUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/login';
            targetUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/statistics';
            testUser = 'Admin';
            testUserPwd = 'Admin1234!';
            failedPwd = 'wrongpassword';
        });

        beforeEach(function() {
            browser.get(pageToTestUrl);
            element(by.id('username')).sendKeys(testUser);
            element(by.id('password')).sendKeys(testUserPwd);
        });

        it('should test the login', function() {
            var hittedUrlPromise;
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            hittedUrlPromise = browser.getCurrentUrl();
            expect(hittedUrlPromise).toEqual(targetUrl);
        });

        it('should logout', function() {
            var alerter;
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            element(by.id('menuLogout')).click();
            browser.waitForAngular();
            alerter = element(by.css('.sweet-alert'));
            alerter.element(by.css('.confirm')).click().then(function(){
                browser.get(pageToTestUrl);
                browser.waitForAngular();
                expect(browser.getCurrentUrl()).toEqual(pageToTestUrl);
            }, 3000);
        });

        it('should do a failed login', function(){
            element(by.id('password')).sendKeys(failedPwd);
            element(by.id('submitbutton')).click();
            browser.waitForAngular();
            expect(element(by.id('failedLogin')).isPresent()).toBe(true);
        });
    });
})();
