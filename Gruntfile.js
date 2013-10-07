'use strict';

module.exports = function (grunt) {

    [   'grunt-contrib-jshint',
        'grunt-contrib-sass',
        'grunt-contrib-connect',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-open',
        'grunt-contrib-clean',
        'grunt-contrib-requirejs'
    ].forEach(grunt.loadNpmTasks);

    var sassFiles = [{
        expand: true,
        cwd: 'sass/',
        dest: 'css/',
        src: '**/*.{sass, scss}',
        ext: '.css'
    }];

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // JSHINT -----------------------------------------------

        jshint: {
            options: {
                node: true,
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'js/**/*.js',
                'tests/**/*.js'
            ]
        },

        // Compress SASS ----------------------------------------

        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: sassFiles
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: sassFiles
            }
        },

        // REQUIREJS -------------------------------------------------

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    name: 'app',
                    include: [
                        'controllers/main.js'
                    ],
                    out: 'js/app.min.js',
                    optimize: 'uglify'
                }
            }
        },

        // SERVER ------------------------------------------------

        connect: {
            server: {
                options: {
                    port: 8000,
                    middleware: function (connect) {
                        var path = require('path');
                        return [
                            connect.static(path.resolve('.'))
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001
                }
            }
        },

        // TESTS ---------------------------------------------------

        jasmine: {
            shell: {
                options: {
                    specs: ['test/specs/**/*_spec.js'],
                    vendor: ['js/vendor/**/*.js'],
                    outfile: 'tests/index.html'
                },
                src: ['js/**/*.js']
            }
        },

        // WATCH -------------------------------------------------------

        watch: {
            sass: {
                files: ['sass/*.{sass,scss}'],
                tasks: ['sass:dev']
            }
        },

        // OPEN BROWSER ------------------------------------------------

        open: {
            server: {
                path: 'http://0.0.0.0:8000'
            },
            test: {
                path: 'http://0.0.0.0:8001/tests/index.html'
            }
        },

        // CLEAN -------------------------------------------------------

        clean: {
            all: ['.grunt', 'css/**/*.css', '!css/bootstrap.min.css', 'tests/index.html', 'js/app.min.js',
                    'build', '*.tar.gz']
        }
    });

    grunt.registerTask('test', 'Running test in comand line', [
        'jshint', 'jasmine'
    ]);

    grunt.registerTask('runtest', 'Running tests', [
        'jshint', 'jasmine:shell:build', 'connect:test', 'open:test', 'watch'
    ]);

    grunt.registerTask('server', 'Run server', [
        'jshint', 'sass:dev', 'connect:server', 'open:server', 'watch'
    ]);
};