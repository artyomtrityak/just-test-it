define(function(require) {
  'use strict';

  var Backbone = require('backbone');

  return Backbone.Model.extend({
    urlRoot: 'books',

    isSynced: function() {
      return this._synced;
    },

    parse: function(data) {
      this._synced = true;
      return data;
    }
  });
});