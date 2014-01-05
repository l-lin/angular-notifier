// Generated on 2013-11-23 using generator-angular 0.6.0-rc.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            src: 'src',
            dist: 'dist',
            build: '.tmp',
            banner: '/*!\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
                ' * https://github.com/l-lin/angular-notifier\n' +
                ' */\n'
        },
        /** ------------- CLEAN TMP FOLDERS ------------- */
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.build %>',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= yeoman.build %>'
        },
        /** ------------- FORMAT JS CODES ------------- */
        jsbeautifier: {
            files: [
                '<%= yeoman.src %>/app/{,*/}*.js',
                'test/{,*/}*.js',
                'Gruntfile.js'
            ],
            options: {}
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.src %>/app/{,*/}*.js'
            ]
        },
        /** ------------- SOURCE CODES MINIMIZATION ------------- */
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= yeoman.banner %>'
            },
            build: {
                options: {
                    stripBanners: false
                },
                src: ['<%= yeoman.src %>/angular-notifier.js',
                    '<%= yeoman.src %>/angular-notifier.factory.js',
                    '<%= yeoman.src %>/angular-notifier.directive.js'
                ],
                dest: '<%= yeoman.build %>/angular-notifier.js'
            },
            // Copy the source files with the banner in dist folder
            banner: {
                src: ['<%= yeoman.build %>/angular-notifier.js'],
                dest: '<%= yeoman.dist %>/angular-notifier.js'
            },
            bannerCSS: {
                src: ['<%= yeoman.src %>/angular-notifier.css'],
                dest: '<%= yeoman.dist %>/angular-notifier.css'
            }
        },
        cssmin: {
            options: {
                banner: '<%= yeoman.banner %>'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/angular-notifier.min.css': [
                        '<%= yeoman.src %>/angular-notifier.css'
                    ]
                }
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.build %>',
                    src: '*.js',
                    dest: '<%= yeoman.build %>'
                }]
            }
        },
        uglify: {
            options: {
                banner: '<%= yeoman.banner %>'
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/angular-notifier.min.js': [
                        '<%= yeoman.build %>/angular-notifier.js'
                    ]
                }
            }
        },
        /** ------------- JS UNIT TESTING + CODE COVERAGE ------------- */
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    /** ---------------------------------------------------- */
    /** ------------- GRUNT TASKS REGISTRATION ------------- */
    /** ---------------------------------------------------- */

    // Task to format js source code
    grunt.registerTask('format', [
        'jsbeautifier'
    ]);

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concat:build',
        'ngmin',
        'cssmin',
        'uglify',
        'concat:banner',
        'concat:bannerCSS',
    ]);

    grunt.registerTask('default', [
        'format',
        'jshint',
        'test',
        'build'
    ]);
};
