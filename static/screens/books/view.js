define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./template.html'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    getMenuContainer: function() {
      return this.$('.menu');
    },

    getBooksContainer: function() {
      return this.$('.books-list');
    },

    getDetailsContainer: function() {
      return this.$('.books-details');
    },

    clearDetails: function() {
      this.$('.books-details').empty();
    }
  });
});