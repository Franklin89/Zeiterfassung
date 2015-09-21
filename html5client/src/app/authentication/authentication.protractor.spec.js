(function() {
    'use strict';

    describe('Zeiterfassung Login- Test', function() {

        var pageToTestUrl, targetUrl, testUser, testUserPwd;

        beforeAll(function() {
            pageToTestUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/login';
            targetUrl = 'http://localhost:63342/Zeiterfassung/html5client/src/app/index.html#/timeRecording';
            testUser = 'Admin';
            testUserPwd = 'Admin1234!';
        });

        beforeEach(function() {
            browser.get(pageToTestUrl);
        });

        it('should test the login', function() {
            var hittedUrl;
            element(by.id('username')).sendKeys(testUser);
            element(by.id('password')).sendKeys(testUserPwd);
            element(by.id('submitbutton')).click();
            hittedUrl = browser.getCurrentUrl();
            expect(hittedUrl).toEqual(targetUrl);
        });
    });
})();
