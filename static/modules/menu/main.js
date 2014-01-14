define(function(require) {
  'use strict';

  var Controller = require('controller'),
      View = require('./view');

  // Controller provides Public API for menu module
  return Controller.extend({
    initialize: function() {
    },

    showMenu: function(container, active) {
      this.view = new View({el: container, active: active});
      this.view.render();
    }    
  });
});