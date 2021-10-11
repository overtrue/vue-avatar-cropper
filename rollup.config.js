import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const name = 'vue-avatar-cropper'
const outFilename = (infix) => `./dist/vue-avatar-cropper.${infix}.js`

const production = process.env.NODE_ENV === 'production' && !process.env.ROLLUP_WATCH

const external = Object
  .keys(pkg.dependencies || {})
  .concat(['vue', 'cropperjs/dist/cropper.css', 'mime/lite'])

const globals = {
  cropperjs: 'Cropper',
  vue: 'Vue',
  'mime/lite': 'mime',
}

const output = []
const plugins = [
  vue({
    preprocessStyles: false,
    template: {
      isProduction: production,
      compilerOptions: {
        whitespace: 'condense',
      },
    },
  }),
  postcss({
    plugins: [
      autoprefixer,
    ],
  }),
]

if (production) {
  output.push(
    {
      file: outFilename('esm'),
      format: 'esm',
      name,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            '@babel/env',
          ],
        }),
        terser({ output: { ecma: 6 } }),
      ],
      globals,
    },

    {
      file: outFilename('umd'),
      format: 'esm',
      name,
      plugins: [
        getBabelOutputPlugin({
          presets: [
            ['@babel/env', { modules: 'umd' }],
          ],
        }),
        terser({ output: { ecma: 5 } }),
      ],
      globals,
    },
  )
} else {
  output.push({
    file: './dev/vue-avatar-cropper.js',
    format: 'umd',
    name,
    globals,
  })
}

export default {
  input: './src/index.js',
  external,
  output,
  plugins,
}
