module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },
        benchmark: {

        }
    });

    // Register tasks
    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('benchmark', 'benchmark');

};