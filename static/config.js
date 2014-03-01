requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    async: 'assets/js/async-0.2.9',
    bootstrap: 'assets/js/bootstrap-3.0',
    jquery: 'assets/js/jquery-1.10.2',
    text: 'assets/js/require-text-2.0.10',
    underscore: 'assets/js/lodash-2.1',
    backbone: 'assets/js/backbone-1.1',
    Q: 'assets/js/q',
    sinon: 'assets/js/sinon',
    controller: 'assets/js/backbone.controller',
    mem: 'assets/js/mem'
  },

  config: {
    app: {
      serverMocks: true
    }
  },

  shim: {
    bootstrap: ['jquery'],
    sinon: {
      exports: 'sinon'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    controller: {
      deps: ['underscore', 'backbone']
    },
    mem: {
      deps: ['underscore']
    }
  },

  packages: [
    'screens/books',
    'screens/authors',
    
    'modules/books',
    'modules/menu',
    'modules/comments'
  ]
});

requirejs(['screens/books', 'screens/authors'], function() {
  Backbone.history.start();
});
