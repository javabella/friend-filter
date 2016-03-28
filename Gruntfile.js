module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
    	options: {
    		browsers: ['last 20 versions']
    	},
    	dist: {
    		expand: true,
        	flatten: true,
    		src: ['app/css/*.css'],
    		dest: 'dist/css/'
    	}
    },
    copy: {
    	main: {
    		files: [
    			{
    				expand: true,
    				flatten: true,
    				src: ['app/components/font-awesome/css/font-awesome.css'],
    				dest: 'dist/css'
    			},
    			{
    				expand: true,
    				flatten: true,
    				src: ['app/img/*'],
    				dest: 'dist/img'
    			},
    			{
    				expand: true,
    				flatten: true,
    				src: ['app/components/font-awesome/fonts/*'],
    				dest: 'dist/fonts'
    			},
    			{
    				expand: true,
    				flatten: true,
    				src: ['app/*.html'],
    				dest: 'dist'
    			}
    		]
    	}
    },
    useref: {
    	html: 'dist/*.html',
    	temp: 'dist'
    },
    'gh-pages': {
		options: {
		base: 'dist'
		},
		src: ['**/*']
	}
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-useref');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['autoprefixer','copy', 'useref']);

};