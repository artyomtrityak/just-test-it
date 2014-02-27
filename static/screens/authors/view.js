define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./template.html'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      console.log('new authors container view');
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
    }
  });
});