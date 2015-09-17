
(function() {
    'use strict';

    /*jslint node: true */
    module.exports = function (grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                files: ['Gruntfile.js', 'src/**/*.js'],
                options: grunt.file.readJSON('.jshintrc')
            },
            jscs: {
                src: 'src/**/*.js',
                options: {
                    config: '.jscsrc'
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks("grunt-jscs");

        grunt.registerTask('test', ['jshint']);
        grunt.registerTask('cc', ['jscs']);
        grunt.registerTask('default', ['jshint', 'jscs']);
    };
})();