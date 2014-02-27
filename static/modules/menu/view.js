define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./templates/menu.html'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      this.container = options.container;
      this.active = options.active;
      this.render();
    },

    render: function() {
      this.$el.html(this.template({active: this.active}));
      this.container.html(this.$el);
      return this;
    },

    getMenuContainer: function() {
      return this.$('.menu');
    }
  });
});