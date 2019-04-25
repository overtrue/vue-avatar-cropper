let mix = require('laravel-mix')

mix.js('src/index.js', 'dist/')

mix.webpackConfig({
  output: {
    libraryTarget: 'umd'
  },
})
