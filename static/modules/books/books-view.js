define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./templates/books.html'),
      BookView = require('./book-view'),
      $ = require('jquery'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      this.container = options.container;
    },

    render: function() {
      this.$el.html(this.template());

      var cache = $('<div />');
      this.collection.each(function(model) {
        var bookView = new BookView({model: model});
        cache.append(bookView.render().$el);
      });

      this.$('.books-collection-view').html(cache);

      this.container.html(this.$el);

      return this;
    }
  });
});