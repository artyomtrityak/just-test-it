define(function(require) {
  'use strict';

  var sinon = require('sinon'),
      server;

  return {
    mock: function() {
      server = sinon.fakeServer.create();
      server.respondWith('books/1', '{"id": 1, "name": "Гарри Поттер", "date": "30 июня 2000 г.", "author": "Дж. К. Роулинг"}');
      server.respondWith('books/2', '{"id": 2, "name": "Нейромант", "date": "3 марта 1984", "author": "Уильяма Гибсон"}');
      server.respondWith('books/',
        '[{"id": 1, "name": "Гарри Поттер", "date": "30 июня 2000 г.", "author": "Дж. К. Роулинг"},'+
        '{"id": 2, "name": "Нейромант", "date": "3 марта 1984", "author": "Уильяма Гибсон"}]');
    },

    respond: function() {
      server.respond();
      server.restore();
    }
  };
    
});