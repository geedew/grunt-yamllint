'use strict';

module.exports = function(grunt) {
	// Load npm plugins to provide necessary tasks.
	require('jit-grunt')(grunt,{
		'yamllint': 'tasks/yamllint.js'
	});
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			]
		},
		clean: {
			test: ['tmp']
		},
		yamllint: {
			options: {
				force: true
			},
			fails: [ 'test/*.yaml' ],
			passes: {
				options: {
					schema: 'DEFAULT_FULL_SCHEMA'
				},
				files: {src:[ 'test/*.yaml']}
			}
		}//,
		// nodeunit: {
		// 	tests: ['test/test.js']
		// }
	});

	grunt.registerTask('test',[
		'jshint',
		'clean',
		'yamllint:fails',
		'yamllint:passes',
		'clean'
	]);

	grunt.registerTask('default',['test']);

};