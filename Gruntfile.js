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
    			},
    			{
    				expand: true,
    				flatten: true,
    				src: ['app/js/*.js'],
    				dest: 'dist/js'
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
	},
	connect: {
	    server: {
	    	options: {
	    		port: 8000,
	    		base: {
	    			path: 'app',
	    			options: {
	    				index: 'index.html'
	    			}
	    		},
	    		keepalive: true,
	    		open: {
		          target: 'http://localhost:8000'
		        }
	    	}
	    }
	}
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-useref');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['autoprefixer','copy', 'useref']);

};