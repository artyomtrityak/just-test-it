define(function(require) {
  'use strict';

  var Controller = require('controller'),
      BooksView = require('./books-view'),
      BookView = require('./book-view'),
      Collection = require('./collection'),
      Model = require('./model'),
      sinon = require('sinon'),
      _ = require('underscore');

  // Controller provides Public API for books module
  return Controller.extend({
    initialize: function() {
      console.log('init books');
    },

    showList: function(container) {
      /*
      var server = sinon.fakeServer.create();
      server.respondWith('books/',
        '[{"id": 1, "name": "Гарри Поттер", "date": "30 июня 2000 г.", "author": "Дж. К. Роулинг"},'+
        '{"id": 2, "name": "Нейромант", "date": "3 марта 1984", "author": "Уильяма Гибсон"}]');
      */

      this.collection = new Collection();
      this.collectionView = new BooksView({
        el: container,
        collection: this.collection
      });
      this.collection.fetch({
        success: _.bind(function() {
          this.collectionView.render();    
        }, this)
      });

      /*
      server.respond();
      server.restore();
      */
    },

    showBook: function(container, id) {
      /*
      var server = sinon.fakeServer.create();
      server.respondWith('books/1', '{"id": 1, "name": "Гарри Поттер", "date": "30 июня 2000 г.", "author": "Дж. К. Роулинг"}');
      server.respondWith('books/2', '{"id": 2, "name": "Нейромант", "date": "3 марта 1984", "author": "Уильяма Гибсон"}');
      */

      this.model = new Model({id: id});
      this.bookView = new BookView({
        el: container,
        model: this.model,
        isDetails: true
      });
      this.model.fetch({
        success: _.bind(function() {
          this.bookView.render();
        }, this)
      });

      /*
      server.respond();
      server.restore();
      */
    },

    remove: function() {
      console.log('remove books');
    }
  });
});