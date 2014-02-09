define(function(require) {
  'use strict';

  var Controller = require('controller'),
      View = require('./view'),
      $ = require('jquery'),
      Mem = require('mem'),

      // Modules used in this screen
      BooksModule = require('modules/books'),
      MenuModule = require('modules/menu'),

  BooksScreenController = Controller.extend({
    routes: {
      '': 'index',
      'books': 'index',
      'books/:id': 'bookDetails'
    },

    onBeforeRoute: function() {
      this.menuModule = Mem.set('menu', MenuModule);
      this.booksModule = Mem.set('books', BooksModule);

      Mem.manage();

      if (this.container) {
        return;
      }

      // Init main module container
      this.container = new View({el: '#wrap'});
      this.container.render();

      // Init menu
      this.menuModule.showMenu(this.container.getMenuContainer(), 'books');
      this.booksModule.showList(this.container.getBooksContainer());
    },

    index: function() {
      this.container.clearDetails();
    },

    bookDetails: function(id) {
      this.booksModule.showBook(this.container.getDetailsContainer(), id);
    },

    remove: function() {
      console.log('Books controller cleanup -> go to another controller');
      this.container = null;
    }
  });

  new BooksScreenController({router: true});
});