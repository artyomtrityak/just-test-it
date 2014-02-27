define(function(require) {
  'use strict';

  var Controller = require('controller'),
      View = require('./view'),
      $ = require('jquery'),
      MenuModule = require('modules/menu'),
      Mem = require('mem'),

  AuthorsScreenController = Controller.extend({
    routes: {
      'authors': 'showAuthors',
      'authors/:name': 'showAuthorDetails'
    },

    onBeforeRoute: function() {
      // Init main module container
      this.container = Mem.set('container', View, {container: '#wrap'});

      this.menuModule = Mem.set('menu', MenuModule);
      this.menuModule.showMenu(this.container.getMenuContainer(), 'authors');
    },

    onAfterRoute: function() {
      Mem.manage();
    },

    showAuthors: function() {
      console.log('showAuthors');
    },

    showAuthorDetails: function(id) {
      console.log('showAuthorDetails');
    },

    remove: function() {
      console.log('Authors controller cleanup -> go to another controller');
    }
  });

  new AuthorsScreenController({router: true});
});