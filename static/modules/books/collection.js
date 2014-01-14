define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      Model = require('./model');

  return Backbone.Collection.extend({
    url: 'books/',
    model: Model
  });
});