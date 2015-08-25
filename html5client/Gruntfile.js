'use strict';

module.exports = function(grunt) {

    // load grunt plugins on demand
    require('jit-grunt')(grunt, {
        // tasks which cannot be resolved by default rules have to be named explicitly
        'htmlbuild': 'grunt-html-build',
        'merge-json': 'grunt-merge-json',
        'protractor': 'grunt-protractor-runner',
        'awesome': 'grunt-is-awesome',
        'newer-clean': 'grunt-newer',
        'replace': 'grunt-text-replace',
        'express': 'grunt-express-server'
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['app.js', 'src/**/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            src: 'grunt/config/watch.js'
        }
    });

    // load build config
    //var options = require('./build.config');

    // load task configurations
    //var configs = require('load-grunt-configs')(grunt, options);

    // initialize loaded configs
    //grunt.initConfig(configs);

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['run']);

    grunt.registerTask('run', 'Run the application in development environment', [
        'uglify', 'watch'
    ]);
};