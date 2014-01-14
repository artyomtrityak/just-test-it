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
          port: 8080,
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
        files: ['static/**/*.js', 'tests/**/*.js'],
        tasks: ['jshint', 'karma:unit:run']
      }
    },

    karma: {
      test: {
        configFile: 'tests/config.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
      unit: {
        configFile: 'tests/config.js',
        background: true
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
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('run', [
    'jshint',
    'less:dev',
    'connect',
    'karma:unit',
    'watch'
  ]);
  grunt.registerTask('test', ['jshint', 'karma:test']);
  grunt.registerTask('default', ['run']);
};
