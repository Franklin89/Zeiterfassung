module.exports = {
    options     : {
        livereload: true
    },
    js          : {
        files: [ '<%= config.files.app.js %>' ],
        tasks: [ 'newer:jshint:js']
    }
};
