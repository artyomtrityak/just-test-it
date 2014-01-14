define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      template = require('text!./templates/menu.html'),
      _ = require('underscore');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      this.active = options.active;
    },

    render: function() {
      this.$el.html(this.template({active: this.active}));
      return this;
    },

    getMenuContainer: function() {
      return this.$('.menu');
    }
  });
});