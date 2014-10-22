'use strict';

module.exports = function(grunt) {
	// Load npm plugins to provide necessary tasks.
	require('jit-grunt')(grunt,{
		'yaml-lint': 'tasks/yaml-lint.js'
	});
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			]
		},
		clean: {
			test: ['tmp']
		},
		'yaml-lint': {
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
		'yaml-lint:fails',
		'yaml-lint:passes',
		'clean'
	]);

	grunt.registerTask('default',['test']);

};