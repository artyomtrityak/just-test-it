define(function(require) {
  'use strict';

  var Controller = require('controller'),
      View = require('./view'),
      $ = require('jquery'),
      Mem = require('mem'),

      // Modules used in this screen
      BooksModule = require('modules/books'),
      MenuModule = require('modules/menu'),
      CommentsModule = require('modules/comments'),

  BooksScreenController = Controller.extend({
    routes: {
      '': 'index',
      'books': 'index',
      'books/:id': 'bookDetails'
    },

    onBeforeRoute: function() {
      // Init main module container
      this.container = Mem.set('container', View, {
        container: $('#wrap')
      });

      // Init menu
      this.menuModule = Mem.set('menu', MenuModule);
      this.menuModule.showMenu(this.container.getMenuContainer(), 'books');

      // Init books
      this.booksModule = Mem.set('books', BooksModule);
      this.booksModule.showList(this.container.getBooksContainer());

      //Init comments
      this.commentsModule = Mem.set('comments', CommentsModule);
    },

    onAfterRoute: function() {
      Mem.manage();
    },

    index: function() {
    },

    bookDetails: function(id) {
      this.booksModule.showBook(this.container.getDetailsContainer(), id);
      this.commentsModule.showComments(id);
    },

    remove: function() {
      console.log('Books controller cleanup -> go to another controller');
    }
  });

  var Book = new BooksScreenController({router: true});
  return Book;
});