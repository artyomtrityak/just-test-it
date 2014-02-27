define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./template.html'),
      $ = require('jquery'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      console.log('new books container view');
      this.container = $(options.container);
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.container.html(this.$el);
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