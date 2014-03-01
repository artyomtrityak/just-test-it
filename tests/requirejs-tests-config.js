// global define: true, _: true, require: true, requirejs: true, $: true

mocha.setup({
  ignoreLeaks: true,
  timeout: 2000
});

// Karma automatically adds `/base` to root path
require.config({
  baseUrl: '/base/static'
});