define(function(require) {
  'use strict';

  var Controller = require('controller'),
      View = require('./view'),
      $ = require('jquery'),

      // Modules used in this screen
      BooksModule = require('modules/books'),
      MenuModule = require('modules/menu'),

  BooksScreenController = Controller.extend({
    routes: {
      '': 'index',
      'books': 'index',
      'books/:id': 'bookDetails'
    },

    initialize: function() {
      this.modules = {};
      this.modules.menu = new MenuModule();
      this.modules.books = new BooksModule();
    },

    onBeforeRoute: function() {
      if (this.container) {
        return;
      }

      // Init main module container
      this.container = new View({el: '#wrap'});
      this.container.render();

      // Init menu
      this.modules.menu.showMenu(this.container.getMenuContainer(), 'books');
      this.modules.books.showList(this.container.getBooksContainer());
    },

    index: function() {
      this.container.clearDetails();
    },

    bookDetails: function(id) {
      this.modules.books.showBook(this.container.getDetailsContainer(), id);
    },

    remove: function() {
      console.log('Books controller cleanup -> go to another controller');
      this.container = null;
    }
  });

  new BooksScreenController({router: true});
});