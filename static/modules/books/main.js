define(function(require) {
  'use strict';

  var Controller = require('controller'),
      Mem = require('mem'),
      BooksView = require('./books-view'),
      BookView = require('./book-view'),
      Collection = require('./collection'),
      Model = require('./model'),
      Mock = require('./mock'),
      _ = require('underscore');

  // Controller provides Public API for books module
  return Controller.extend({
    initialize: function() {
      console.log('init books widget');
    },

    showList: function(container) {
      //Mock.mock();

      this.collection = Mem.set('booksCollection', Collection);
      
      this.collectionView = Mem.set('booksListView', BooksView, {
        container: container,
        collection: this.collection
      });

      if (!this.collection.length) {
        this.collection.fetch({
          success: _.bind(function() {
            this.collectionView.render();    
          }, this)
        });  
      }

      //Mock.respond();
    },

    showBook: function(container, id) {
      //Mock.mock();

      this.model = Mem.set('bookDetailsModel', Model, {id: id});

      this.bookView = Mem.set('bookDetailsView', BookView, {
        container: container,
        model: this.model,
        isDetails: true
      });

      if (!this.model.isSynced()) {
        this.model.fetch({
          success: _.bind(function() {
            this.bookView.render();
          }, this)
        });
      }

      //Mock.respond();
    },

    remove: function() {
      console.log('remove books widget');
    }
  });
});