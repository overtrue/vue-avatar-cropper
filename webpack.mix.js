let mix = require('laravel-mix')

mix.js('src/index.js', 'dist/')

mix.webpackConfig({
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
})
