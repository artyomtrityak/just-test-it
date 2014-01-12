module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      dev: {
        files: {
          "static/assets/css/app.css": "static/assets/less/app.less"
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8081,
          livereload: true,
          base: './'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: ['static/**/*.less'],
        tasks: ['less:dev']
      },
      html: {
        files: ['index.html', 'static/**/*.html', 'static/**/*.hbs'],
        tasks: []
      },
      js: {
        files: ['static/**/*.js'],
        tasks: ['jshint']
      }
    },

    jshint: {
      options: {
        browser: true,
        globals: {
          requirejs: true,
          console: true
        }
      },
      all: ['Gruntfile.js', 'static/**/*.js', '!**/assets/**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('run', 'runs all tasks', function() {
    var tasks = ['jshint', 'less:dev', 'connect', 'watch'];
    grunt.option('force', true);
    grunt.task.run(tasks);
  });

  grunt.registerTask('default', ['run']);
};
