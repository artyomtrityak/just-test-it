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
    controller: 'assets/js/backbone.controller'
  },

  config: {
    app: {
      serverMocks: true
    }
  },

  shim: {
    bootstrap: ['jquery'],
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    controller: {
      deps: ['underscore', 'backbone']
    },
    app: ['controller']
  },

  packages: [
    
  ]
});

requirejs(['app']);
