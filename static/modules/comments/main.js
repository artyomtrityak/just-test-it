define(function(require) {
  'use strict';

  var Controller = require('controller'),
      Collection = require('./collection'),
      View = require('./view'),
      Q = require('Q'),
      Mem = require('mem');

  // Controller provides Public API for main module
  return Controller.extend({

    getComments: function(bookId) {
      this.collection = new Collection([], {
        id: bookId
      });
      this.collection.fetch();
      return this.collection;
    },

    showComments: function(bookId) {
      var collection = this.getComments(bookId);
      this.view = new View({collection: collection});
    },

    onChange: function() {
      var defer = Q.defer(),
          self = this;

      defer.promise.then(function(bookId) {
        self.showComments(bookId);
      });

      return defer;
    },

    remove: function() {
      console.log('remove comments widget');
      if (this.view && typeof this.view.remove === 'function') {
        this.view.remove();
      }
      if (this.collection) {
        this.collection = null;
      }
    }
  });
});