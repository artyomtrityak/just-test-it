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
      this.menuModule = Mem.set('menu', MenuModule);

      Mem.manage();

      if (this.container) {
        return;
      }

      // Init main module container
      this.container = new View({el: '#wrap'});
      this.container.render();

      this.menuModule.showMenu(this.container.getMenuContainer(), 'authors');
    },

    showAuthors: function() {
      console.log('showAuthors');
    },

    showAuthorDetails: function(id) {
      console.log('showAuthorDetails');
    },

    remove: function() {
      console.log('Authors controller cleanup -> go to another controller');
      this.container = null;
    }
  });

  new AuthorsScreenController({router: true});
});