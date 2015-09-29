exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //specs: ['../../src/app/**/*.protractor.spec.js', '../overall/**/*.protractor.spec.js']
    specs: ['../overall/**/*.protractor.spec.js']
}
