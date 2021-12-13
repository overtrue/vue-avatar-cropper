import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import pkg from "./package.json"

const external = Object.keys(pkg.dependencies || {}).concat([
  "vue",
  "cropperjs/dist/cropper.css",
  "mime/lite",
])

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "vue-avatar-cropper",
      fileName: (format) => `vue-avatar-cropper.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: external,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
