
(function() {
    'use strict';

    /*jslint node: true */
    module.exports = function (grunt) {

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    mangle: false,
                    sourceMap: true,
                    sourceMapName: 'build/<%= pkg.name %>.map'
                },
                dist: {
                    files: {
                        //'build/<%= pkg.name %>.min.js': ['bower_components/**/*.min.js', 'node_modules/**/*.min.js', 'src/app/**/*.js', '!src/app/**/*.spec.js']
                        'build/<%= pkg.name %>.min.js': ['src/app/**/*.js', '!src/app/**/*.spec.js']
                    }
                }
            },
            jshint: {
                files: ['Gruntfile.js', 'src/**/*.js'],
                options: grunt.file.readJSON('.jshintrc')
            },
            jscs: {
                src: 'src/**/*.js',
                options: {
                    config: '.jscsrc'
                }
            },
            protractor: {
                options: {
                    configFile: "test/conf/protractor-conf.js",
                    noColor: false,
                    args: { }
                },
                e2e: {
                    options: {
                        keepAlive: false
                    }
                },
                continuous: {
                    options: {
                        keepAlive: true
                    }
                }
            },
            connect: {
                options: {
                    port: 9000,
                    hostname: 'localhost'
                },
                test: {
                    options: {
                        // set the location of the application files
                        base: ['src/app']
                    }
                }
            },
            watch: {
                files: ['<%= jshint.files %>'],
                tasks: ['test-jsh', 'test-cs']
            }
            //watch: {
            //    options: {
            //        livereload: true
            //    }//,
                //karma: {
                //    files: ['app/js/**/*.js', 'test/unit/*.js'],
                //    tasks: ['karma:continuous:run']
                //},
                //protractor: {
                //    files: ['app/js/**/*.js', 'test/e2e/*.js'],
                //    tasks: ['protractor:continuous']
                //}
            //}
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jscs');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-protractor-runner');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.registerTask('ugly', ['uglify']);
        grunt.registerTask('test-jsh', ['jshint']);
        grunt.registerTask('test-cs', ['jscs']);
        grunt.registerTask('test-e2e', ['connect:test', 'protractor:e2e']);

        grunt.registerTask('default', ['test-jsh', 'test-cs', 'test-e2e', 'ugly']);
    };
})();