// global define: true, _: true, require: true, requirejs: true, $: true

mocha.setup({ignoreLeaks: true});

// Karma automatically adds `/base` to root path
require.config({
  baseUrl: '/base/static'
});