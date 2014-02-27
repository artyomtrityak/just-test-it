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
      // Init main module container
      this.container = Mem.set('container', View, {container: '#wrap'});

      // Init menu
      this.menuModule = Mem.set('menu', MenuModule);
      this.menuModule.showMenu(this.container.getMenuContainer(), 'books');

      // Init books
      this.booksModule = Mem.set('books', BooksModule);
      this.booksModule.showList(this.container.getBooksContainer());
    },

    onAfterRoute: function() {
      Mem.manage();
    },

    index: function() {
      //this.container.clearDetails();
    },

    bookDetails: function(id) {
      this.booksModule.showBook(this.container.getDetailsContainer(), id);
    },

    remove: function() {
      console.log('Books controller cleanup -> go to another controller');
    }
  });

  new BooksScreenController({router: true});
});