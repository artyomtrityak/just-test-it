define(function(require) {
  'use strict';

  var Controller = require('controller'),
      Mem = require('mem'),
      View = require('./view');

  // Controller provides Public API for menu module
  return Controller.extend({
    initialize: function() {
    },

    showMenu: function(container, active) {
      this.view = Mem.set('menuView', View, {
        container: container,
        active: active
      });
    }    
  });
});