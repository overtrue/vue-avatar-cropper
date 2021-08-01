(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cropperjs/dist/cropper.css'), require('cropperjs')) :
  typeof define === 'function' && define.amd ? define(['cropperjs/dist/cropper.css', 'cropperjs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['vue-avatar-cropper'] = factory(null, global.Cropper));
}(this, (function (cropper_css, Cropper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Cropper__default = /*#__PURE__*/_interopDefaultLegacy(Cropper);

  //

  var script = {
    name: 'AvatarCropper',

    model: {
      prop: 'trigger',
      event: 'triggered',
    },

    props: {
      trigger: {
        type: Boolean,
        default: false,
      },

      file: {
        type: File,
      },

      uploadHandler: {
        type: Function,
      },

      uploadUrl: {
        type: String,
      },

      requestOptions: {
        type: Object,
        default() {
          return {
            method: 'POST',
          }
        },
      },

      uploadFileField: {
        type: String,
        default: 'file',
      },

      uploadFormData: {
        type: FormData,
        default() {
          return new FormData()
        },
      },

      cropperOptions: {
        type: Object,
        default() {
          return {
            aspectRatio: 1,
            autoCropArea: 1,
            viewMode: 1,
            movable: false,
            zoomable: false,
          }
        },
      },

      outputOptions: {
        type: Object,
      },

      outputMime: {
        type: String,
        default: null,
      },

      outputQuality: {
        type: Number,
        default: 0.9,
      },

      mimes: {
        type: String,
        default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
      },

      capture: {
        type: String,
      },

      labels: {
        type: Object,
        default() {
          return {
            submit: 'Ok',
            cancel: 'Cancel',
          }
        },
      },

      inline: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        cropper: undefined,
        dataUrl: undefined,
        filename: undefined,
      }
    },

    computed: {
      cleanedMimes() {
        if (!this.mimes) throw new Error('vue-avatar-cropper: mimes prop cannot be empty')

        return this.mimes
          .trim()
          .toLowerCase()
      },
    },

    watch: {
      trigger(value) {
        if (!value) return

        if (this.file) {
          this.onFileChange(this.file);
        } else {
          this.pickImage();
        }

        this.$emit('triggered', false);
      },
    },

    mounted() {
      this.$emit('triggered', false);
    },

    methods: {
      destroy() {
        if (this.cropper) this.cropper.destroy();

        if (this.$refs.input) this.$refs.input.value = '';

        this.dataUrl = undefined;
      },

      submit() {
        this.$emit('submit');

        if (this.uploadUrl) {
          this.uploadImage();
        } else if (this.uploadHandler) {
          this.uploadHandler(this.cropper);
        } else {
          this.$emit('error', {
            type: 'user',
            message: 'No upload handler found',
          });
        }

        this.destroy();
      },

      cancel(){
          this.$emit('cancel');
          this.destroy();
      },

      onImgElementError() {
        this.$emit('error', {
          type: 'load',
          message: 'File loading failed',
        });
        this.destroy();
      },

      pickImage() {
        if (this.$refs.input) this.$refs.input.click();
      },

      onFileChange(file) {
        if (this.cleanedMimes === 'image/*') {
          if (file.type.split('/')[0] !== 'image') {
            this.$emit('error', {
              type: 'user',
              message: 'File type not correct',
            });
            return
          }
        } else if (this.cleanedMimes) {
          const correctType = this.cleanedMimes
            .split(', ')
            .find((mime) => mime === file.type);

          if (!correctType) {
            this.$emit('error', {
              type: 'user',
              message: 'File type not correct',
            });
            return
          }
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataUrl = e.target.result;
        };

        reader.readAsDataURL(file);

        this.filename = file.name || 'unknown';
        this.mimeType = this.mimeType || file.type;
        this.$emit('changed', {
          file,
          reader,
        });
      },

      onFileInputChange(e) {
        if (!e.target.files || !e.target.files[0]) return

        this.onFileChange(e.target.files[0]);
      },

      createCropper() {
        this.cropper = new Cropper__default['default'](
          this.$refs.img,
          this.cropperOptions,
        );
      },

      uploadImage() {
        this.cropper
          .getCroppedCanvas(this.outputOptions)
          .toBlob(async (blob) => {
            const form = new FormData();

            for (const [key, value] in this.uploadFormData.entries()) {
              form.append(key, value);
            }

            form.append(this.uploadFormName, blob, this.filename);

            const requestOptions = Object.assign(
              {
                body: form,
              },
              this.requestOptions,
            );

            const request = new Request(
              this.uploadUrl,
              requestOptions,
            );

            const reqPromise = fetch(request);

            this.$emit('uploading', {
              form,
              request,
              response: reqPromise,
            });

            const response = await reqPromise;

            this.$emit('completed', {
              form,
              request,
              response,
            });

            if (response.ok) {
              this.$emit('uploaded', {
                form,
                request,
                response,
              });
            } else {
              this.$emit('error', {
                type: 'upload',
                message: 'Image upload fail',
                context: {
                  request,
                  response,
                },
              });
            }
          },
          this.outputMime,
          this.outputQuality,
        );
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "avatar-cropper" }, [
      _vm.dataUrl
        ? _c(
            "div",
            {
              staticClass: "avatar-cropper-overlay",
              class: { "avatar-cropper-overlay-inline": _vm.inline }
            },
            [
              !_vm.inline
                ? _c("div", { staticClass: "avatar-cropper-mark" }, [
                    _c(
                      "a",
                      {
                        staticClass: "avatar-cropper-close",
                        attrs: { title: _vm.labels.cancel, href: "javascript:;" },
                        on: { click: _vm.cancel }
                      },
                      [_vm._v("×")]
                    )
                  ])
                : _vm._e(),
              _c("div", { staticClass: "avatar-cropper-container" }, [
                _c("div", { staticClass: "avatar-cropper-image-container" }, [
                  _c("img", {
                    ref: "img",
                    attrs: { src: _vm.dataUrl, alt: "" },
                    on: {
                      load: function($event) {
                        $event.stopPropagation();
                        return _vm.createCropper.apply(null, arguments)
                      },
                      error: _vm.onImgElementError
                    }
                  })
                ]),
                _c("div", { staticClass: "avatar-cropper-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "avatar-cropper-btn",
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.cancel.apply(null, arguments)
                        }
                      }
                    },
                    [_vm._v(" " + _vm._s(_vm.labels.cancel) + " ")]
                  ),
                  _c(
                    "button",
                    {
                      staticClass: "avatar-cropper-btn",
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.submit.apply(null, arguments)
                        }
                      }
                    },
                    [_vm._v(" " + _vm._s(_vm.labels.submit) + " ")]
                  )
                ])
              ])
            ]
          )
        : _vm._e(),
      !_vm.file
        ? _c("input", {
            ref: "input",
            staticClass: "avatar-cropper-img-input",
            attrs: {
              accept: _vm.cleanedMimes,
              capture: _vm.capture,
              type: "file"
            },
            on: { change: _vm.onFileInputChange }
          })
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-a9682ecc_0", { source: ".avatar-cropper .avatar-cropper-overlay {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.avatar-cropper .avatar-cropper-overlay-inline {\n  position: initial;\n}\n.avatar-cropper .avatar-cropper-img-input {\n  display: none;\n}\n.avatar-cropper .avatar-cropper-close {\n  float: right;\n  padding: 20px;\n  font-size: 3rem;\n  color: #fff;\n  font-weight: 100;\n  text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n}\n.avatar-cropper .avatar-cropper-mark {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.avatar-cropper .avatar-cropper-container {\n  background: #fff;\n  z-index: 999;\n  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-image-container {\n  position: relative;\n  max-width: 400px;\n  height: 300px;\n}\n.avatar-cropper .avatar-cropper-container img {\n  max-width: 100%;\n  height: 100%;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer {\n  display: flex;\n  align-items: stretch;\n  align-content: stretch;\n  justify-content: space-between;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn {\n  width: 50%;\n  padding: 15px 0;\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  outline: none;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {\n  background-color: #2aabd2;\n  color: #fff;\n}\n\n/*# sourceMappingURL=vue-avatar-cropper.vue.map */", map: {"version":3,"sources":["/home/ferretwithaberet/Projects/Github/vue-avatar-cropper/src/vue-avatar-cropper.vue","vue-avatar-cropper.vue"],"names":[],"mappings":"AAqWA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,cAAA;ACpWA;ADuWA;EACA,iBAAA;ACrWA;ADwWA;EACA,aAAA;ACtWA;ADyWA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,0CAAA;ACvWA;AD0WA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,8BAAA;ACxWA;AD2WA;EACA,gBAAA;EACA,YAAA;EACA,iDAAA;ACzWA;AD2WA;EACA,kBAAA;EACA,gBAAA;EACA,aAAA;ACzWA;AD4WA;EACA,eAAA;EACA,YAAA;AC1WA;AD6WA;EACA,aAAA;EACA,oBAAA;EACA,sBAAA;EACA,8BAAA;AC3WA;AD6WA;EACA,UAAA;EACA,eAAA;EACA,eAAA;EACA,YAAA;EACA,uBAAA;EACA,aAAA;AC3WA;AD6WA;EACA,yBAAA;EACA,WAAA;AC3WA;;AAEA,iDAAiD","file":"vue-avatar-cropper.vue","sourcesContent":["<template>\n  <div class=\"avatar-cropper\">\n    <div\n      class=\"avatar-cropper-overlay\"\n      :class=\"{'avatar-cropper-overlay-inline': inline}\"\n      v-if=\"dataUrl\"\n    >\n      <div class=\"avatar-cropper-mark\" v-if=\"!inline\">\n        <a\n          @click=\"cancel\"\n          class=\"avatar-cropper-close\"\n          :title=\"labels.cancel\"\n          href=\"javascript:;\"\n        >&times;</a>\n      </div>\n\n      <div class=\"avatar-cropper-container\">\n        <div class=\"avatar-cropper-image-container\">\n          <img\n            ref=\"img\"\n            :src=\"dataUrl\"\n            alt\n            @load.stop=\"createCropper\"\n            @error=\"onImgElementError\"\n          />\n        </div>\n\n        <div class=\"avatar-cropper-footer\">\n          <button\n            @click.stop.prevent=\"cancel\"\n            class=\"avatar-cropper-btn\"\n          >\n            {{ labels.cancel }}\n          </button>\n\n          <button\n            @click.stop.prevent=\"submit\"\n            class=\"avatar-cropper-btn\"\n          >\n            {{ labels.submit }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <input\n      v-if=\"!file\"\n      :accept=\"cleanedMimes\"\n      :capture=\"capture\"\n      class=\"avatar-cropper-img-input\"\n      ref=\"input\"\n      type=\"file\"\n      @change=\"onFileInputChange\"\n    />\n  </div>\n</template>\n\n<script>\nimport 'cropperjs/dist/cropper.css'\nimport Cropper from 'cropperjs'\n\nexport default {\n  name: 'AvatarCropper',\n\n  model: {\n    prop: 'trigger',\n    event: 'triggered',\n  },\n\n  props: {\n    trigger: {\n      type: Boolean,\n      default: false,\n    },\n\n    file: {\n      type: File,\n    },\n\n    uploadHandler: {\n      type: Function,\n    },\n\n    uploadUrl: {\n      type: String,\n    },\n\n    requestOptions: {\n      type: Object,\n      default() {\n        return {\n          method: 'POST',\n        }\n      },\n    },\n\n    uploadFileField: {\n      type: String,\n      default: 'file',\n    },\n\n    uploadFormData: {\n      type: FormData,\n      default() {\n        return new FormData()\n      },\n    },\n\n    cropperOptions: {\n      type: Object,\n      default() {\n        return {\n          aspectRatio: 1,\n          autoCropArea: 1,\n          viewMode: 1,\n          movable: false,\n          zoomable: false,\n        }\n      },\n    },\n\n    outputOptions: {\n      type: Object,\n    },\n\n    outputMime: {\n      type: String,\n      default: null,\n    },\n\n    outputQuality: {\n      type: Number,\n      default: 0.9,\n    },\n\n    mimes: {\n      type: String,\n      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',\n    },\n\n    capture: {\n      type: String,\n    },\n\n    labels: {\n      type: Object,\n      default() {\n        return {\n          submit: 'Ok',\n          cancel: 'Cancel',\n        }\n      },\n    },\n\n    inline: {\n      type: Boolean,\n      default: false,\n    },\n  },\n\n  data() {\n    return {\n      cropper: undefined,\n      dataUrl: undefined,\n      filename: undefined,\n    }\n  },\n\n  computed: {\n    cleanedMimes() {\n      if (!this.mimes) throw new Error('vue-avatar-cropper: mimes prop cannot be empty')\n\n      return this.mimes\n        .trim()\n        .toLowerCase()\n    },\n  },\n\n  watch: {\n    trigger(value) {\n      if (!value) return\n\n      if (this.file) {\n        this.onFileChange(this.file)\n      } else {\n        this.pickImage()\n      }\n\n      this.$emit('triggered', false)\n    },\n  },\n\n  mounted() {\n    this.$emit('triggered', false)\n  },\n\n  methods: {\n    destroy() {\n      if (this.cropper) this.cropper.destroy()\n\n      if (this.$refs.input) this.$refs.input.value = ''\n\n      this.dataUrl = undefined\n    },\n\n    submit() {\n      this.$emit('submit')\n\n      if (this.uploadUrl) {\n        this.uploadImage()\n      } else if (this.uploadHandler) {\n        this.uploadHandler(this.cropper)\n      } else {\n        this.$emit('error', {\n          type: 'user',\n          message: 'No upload handler found',\n        })\n      }\n\n      this.destroy()\n    },\n\n    cancel(){\n        this.$emit('cancel')\n        this.destroy()\n    },\n\n    onImgElementError() {\n      this.$emit('error', {\n        type: 'load',\n        message: 'File loading failed',\n      })\n      this.destroy()\n    },\n\n    pickImage() {\n      if (this.$refs.input) this.$refs.input.click()\n    },\n\n    onFileChange(file) {\n      if (this.cleanedMimes === 'image/*') {\n        if (file.type.split('/')[0] !== 'image') {\n          this.$emit('error', {\n            type: 'user',\n            message: 'File type not correct',\n          })\n          return\n        }\n      } else if (this.cleanedMimes) {\n        const correctType = this.cleanedMimes\n          .split(', ')\n          .find((mime) => mime === file.type)\n\n        if (!correctType) {\n          this.$emit('error', {\n            type: 'user',\n            message: 'File type not correct',\n          })\n          return\n        }\n      }\n\n      const reader = new FileReader()\n      reader.onload = (e) => {\n        this.dataUrl = e.target.result\n      }\n\n      reader.readAsDataURL(file)\n\n      this.filename = file.name || 'unknown'\n      this.mimeType = this.mimeType || file.type\n      this.$emit('changed', {\n        file,\n        reader,\n      })\n    },\n\n    onFileInputChange(e) {\n      if (!e.target.files || !e.target.files[0]) return\n\n      this.onFileChange(e.target.files[0])\n    },\n\n    createCropper() {\n      this.cropper = new Cropper(\n        this.$refs.img,\n        this.cropperOptions,\n      )\n    },\n\n    uploadImage() {\n      this.cropper\n        .getCroppedCanvas(this.outputOptions)\n        .toBlob(async (blob) => {\n          const form = new FormData()\n\n          for (const [key, value] in this.uploadFormData.entries()) {\n            form.append(key, value)\n          }\n\n          form.append(this.uploadFormName, blob, this.filename)\n\n          const requestOptions = Object.assign(\n            {\n              body: form,\n            },\n            this.requestOptions,\n          )\n\n          const request = new Request(\n            this.uploadUrl,\n            requestOptions,\n          )\n\n          const reqPromise = fetch(request)\n\n          this.$emit('uploading', {\n            form,\n            request,\n            response: reqPromise,\n          })\n\n          const response = await reqPromise\n\n          this.$emit('completed', {\n            form,\n            request,\n            response,\n          })\n\n          if (response.ok) {\n            this.$emit('uploaded', {\n              form,\n              request,\n              response,\n            })\n          } else {\n            this.$emit('error', {\n              type: 'upload',\n              message: 'Image upload fail',\n              context: {\n                request,\n                response,\n              },\n            })\n          }\n        },\n        this.outputMime,\n        this.outputQuality,\n      )\n    },\n  },\n}\n</script>\n\n<style lang=\"scss\">\n.avatar-cropper {\n  .avatar-cropper-overlay {\n    text-align: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99999;\n  }\n\n  .avatar-cropper-overlay-inline{\n    position: initial;\n  }\n\n  .avatar-cropper-img-input {\n    display: none;\n  }\n\n  .avatar-cropper-close {\n    float: right;\n    padding: 20px;\n    font-size: 3rem;\n    color: #fff;\n    font-weight: 100;\n    text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n  }\n\n  .avatar-cropper-mark {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.1);\n  }\n\n  .avatar-cropper-container {\n    background: #fff;\n    z-index: 999;\n    box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n\n    .avatar-cropper-image-container {\n      position: relative;\n      max-width: 400px;\n      height: 300px;\n    }\n\n    img {\n      max-width: 100%;\n      height: 100%;\n    }\n\n    .avatar-cropper-footer {\n      display: flex;\n      align-items: stretch;\n      align-content: stretch;\n      justify-content: space-between;\n\n      .avatar-cropper-btn {\n        width: 50%;\n        padding: 15px 0;\n        cursor: pointer;\n        border: none;\n        background: transparent;\n        outline: none;\n\n        &:hover {\n          background-color: #2aabd2;\n          color: #fff;\n        }\n      }\n    }\n  }\n}\n</style>\n",".avatar-cropper .avatar-cropper-overlay {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.avatar-cropper .avatar-cropper-overlay-inline {\n  position: initial;\n}\n.avatar-cropper .avatar-cropper-img-input {\n  display: none;\n}\n.avatar-cropper .avatar-cropper-close {\n  float: right;\n  padding: 20px;\n  font-size: 3rem;\n  color: #fff;\n  font-weight: 100;\n  text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n}\n.avatar-cropper .avatar-cropper-mark {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.avatar-cropper .avatar-cropper-container {\n  background: #fff;\n  z-index: 999;\n  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-image-container {\n  position: relative;\n  max-width: 400px;\n  height: 300px;\n}\n.avatar-cropper .avatar-cropper-container img {\n  max-width: 100%;\n  height: 100%;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer {\n  display: flex;\n  align-items: stretch;\n  align-content: stretch;\n  justify-content: space-between;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn {\n  width: 50%;\n  padding: 15px 0;\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  outline: none;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {\n  background-color: #2aabd2;\n  color: #fff;\n}\n\n/*# sourceMappingURL=vue-avatar-cropper.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // executed by Vue.use()
  const install = (Vue) => {
    if (install.installed) return
    install.installed = true;
    Vue.component(__vue_component__.name, __vue_component__);
  };

  // auto-install when Vue is found
  let GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    /* eslint-disable-next-line no-undef */
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use({ install });
  }

  return __vue_component__;

})));
