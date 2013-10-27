/* grunt.js file */

module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({

        copy: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['**'],
                    dest: 'dist/css'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'css/fonts/',
                    src: ['**'],
                    dest: 'dist/css_compiled/fonts/'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'css/images/',
                    src: ['**'],
                    dest: 'dist/css_compiled/images/'
                }]
            },
            jslibs: {
                files: [{
                    expand: true,
                    cwd: 'js_lib/',
                    src: ['**'],
                    dest: 'dist/js/lib'
                }]
            },
            sounds: {
                files: [{
                    expand: true,
                    cwd: 'sound/',
                    src: ['**'],
                    dest: 'dist/sound'
                }]
            }
        },
        recess: {
            lint: {
                src: ['css/**/*.css'],
                options: {
                    strictPropertyOrder: false,
                    noOverqualifying: false,
                    noUnderscores: false,
                    zeroUnits: false,
                    noIDs: false
                }
            },
            compile: {
                src: ['css/**/*.css'],
                dest: 'dist/css_compiled/main.css',
                options: {
                    compile: true,
                    compress: true
                }
            }
        },
        coffee: {
            app: {
                expand: true,
                cwd: 'coffee/',
                src: ['**/*.coffee'],
                dest: 'dist/js/',
                ext: '.js',
                options: {
                    sourceMap: true,
                    bare: true
                }
            },
            tests: {
                expand: true,
                cwd: 'tests/coffee/',
                src: ['*.coffee'],
                dest: 'dist/tests/js/',
                ext: '.js',
                options: {
                    bare: true,
                    preserve_dirs: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['coffee/**/*.coffee'],
                tasks: ['compile']
            }
        },
        coffeelint: {
            lcl: ['coffee/*.coffee']
        },
        clean: {
            docs: [
                'dist/docs/'
            ],
            tests: [
                'dist/tests/js/testLiveCodeLab.js'
            ],
            build: [
                'dist'
            ]
        },
        targethtml: {
            main: {
                src: 'templts/index.html.templt',
                dest: 'dist/index.html'
            },
            dev: {
                src: 'templts/index.html.templt',
                dest: 'dist/index-dev.html'
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'buildSystem',
                js: 'dist/built.js',
                jsOutputFile: 'js_compiled/Livecodelab-minified.js',
                maxBuffer: 2000000,
                options: {
                    jscomp_off: [
                        'globalThis',
                        'checkTypes'],
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: [
                        'buildSystem/externs_common.js']
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'lcl-init',
                    baseUrl: 'dist/js/',
                    mainConfigFile: 'dist/js/rjs-init.js',
                    out: 'dist/js_compiled/lcl-min.js'
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'coffeelint');
    grunt.registerTask('lint', ['coffeelint', 'recess:lint']);

    grunt.registerTask('docs', [
        'clean:docs'
    ]);


    grunt.registerTask('build', [
        'clean:build',
        'coffee:app',
        'copy',
        'recess:compile',
        'requirejs',
        'targethtml'
    ]);


    // Load NPM Task modules
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

};
