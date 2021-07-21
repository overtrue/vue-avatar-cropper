(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cropperjs')) :
  typeof define === 'function' && define.amd ? define(['cropperjs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['vue-avatar-cropper'] = factory(global.Cropper));
}(this, (function (Cropper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Cropper__default = /*#__PURE__*/_interopDefaultLegacy(Cropper);

  var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

  var css = "/*!\n * Cropper.js v1.5.12\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2021-06-12T08:00:11.623Z\n */\n\n.cropper-container {\n  direction: ltr;\n  font-size: 0;\n  line-height: 0;\n  position: relative;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.cropper-container img {\n  display: block;\n  height: 100%;\n  image-orientation: 0deg;\n  max-height: none !important;\n  max-width: none !important;\n  min-height: 0 !important;\n  min-width: 0 !important;\n  width: 100%;\n}\n\n.cropper-wrap-box,\n.cropper-canvas,\n.cropper-drag-box,\n.cropper-crop-box,\n.cropper-modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.cropper-wrap-box,\n.cropper-canvas {\n  overflow: hidden;\n}\n\n.cropper-drag-box {\n  background-color: #fff;\n  opacity: 0;\n}\n\n.cropper-modal {\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.cropper-view-box {\n  display: block;\n  height: 100%;\n  outline: 1px solid #39f;\n  outline-color: rgba(51, 153, 255, 0.75);\n  overflow: hidden;\n  width: 100%;\n}\n\n.cropper-dashed {\n  border: 0 dashed #eee;\n  display: block;\n  opacity: 0.5;\n  position: absolute;\n}\n\n.cropper-dashed.dashed-h {\n  border-bottom-width: 1px;\n  border-top-width: 1px;\n  height: calc(100% / 3);\n  left: 0;\n  top: calc(100% / 3);\n  width: 100%;\n}\n\n.cropper-dashed.dashed-v {\n  border-left-width: 1px;\n  border-right-width: 1px;\n  height: 100%;\n  left: calc(100% / 3);\n  top: 0;\n  width: calc(100% / 3);\n}\n\n.cropper-center {\n  display: block;\n  height: 0;\n  left: 50%;\n  opacity: 0.75;\n  position: absolute;\n  top: 50%;\n  width: 0;\n}\n\n.cropper-center::before,\n.cropper-center::after {\n  background-color: #eee;\n  content: ' ';\n  display: block;\n  position: absolute;\n}\n\n.cropper-center::before {\n  height: 1px;\n  left: -3px;\n  top: 0;\n  width: 7px;\n}\n\n.cropper-center::after {\n  height: 7px;\n  left: 0;\n  top: -3px;\n  width: 1px;\n}\n\n.cropper-face,\n.cropper-line,\n.cropper-point {\n  display: block;\n  height: 100%;\n  opacity: 0.1;\n  position: absolute;\n  width: 100%;\n}\n\n.cropper-face {\n  background-color: #fff;\n  left: 0;\n  top: 0;\n}\n\n.cropper-line {\n  background-color: #39f;\n}\n\n.cropper-line.line-e {\n  cursor: ew-resize;\n  right: -3px;\n  top: 0;\n  width: 5px;\n}\n\n.cropper-line.line-n {\n  cursor: ns-resize;\n  height: 5px;\n  left: 0;\n  top: -3px;\n}\n\n.cropper-line.line-w {\n  cursor: ew-resize;\n  left: -3px;\n  top: 0;\n  width: 5px;\n}\n\n.cropper-line.line-s {\n  bottom: -3px;\n  cursor: ns-resize;\n  height: 5px;\n  left: 0;\n}\n\n.cropper-point {\n  background-color: #39f;\n  height: 5px;\n  opacity: 0.75;\n  width: 5px;\n}\n\n.cropper-point.point-e {\n  cursor: ew-resize;\n  margin-top: -3px;\n  right: -3px;\n  top: 50%;\n}\n\n.cropper-point.point-n {\n  cursor: ns-resize;\n  left: 50%;\n  margin-left: -3px;\n  top: -3px;\n}\n\n.cropper-point.point-w {\n  cursor: ew-resize;\n  left: -3px;\n  margin-top: -3px;\n  top: 50%;\n}\n\n.cropper-point.point-s {\n  bottom: -3px;\n  cursor: s-resize;\n  left: 50%;\n  margin-left: -3px;\n}\n\n.cropper-point.point-ne {\n  cursor: nesw-resize;\n  right: -3px;\n  top: -3px;\n}\n\n.cropper-point.point-nw {\n  cursor: nwse-resize;\n  left: -3px;\n  top: -3px;\n}\n\n.cropper-point.point-sw {\n  bottom: -3px;\n  cursor: nesw-resize;\n  left: -3px;\n}\n\n.cropper-point.point-se {\n  bottom: -3px;\n  cursor: nwse-resize;\n  height: 20px;\n  opacity: 1;\n  right: -3px;\n  width: 20px;\n}\n\n@media (min-width: 768px) {\n  .cropper-point.point-se {\n    height: 15px;\n    width: 15px;\n  }\n}\n\n@media (min-width: 992px) {\n  .cropper-point.point-se {\n    height: 10px;\n    width: 10px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .cropper-point.point-se {\n    height: 5px;\n    opacity: 0.75;\n    width: 5px;\n  }\n}\n\n.cropper-point.point-se::before {\n  background-color: #39f;\n  bottom: -50%;\n  content: ' ';\n  display: block;\n  height: 200%;\n  opacity: 0;\n  position: absolute;\n  right: -50%;\n  width: 200%;\n}\n\n.cropper-invisible {\n  opacity: 0;\n}\n\n.cropper-bg {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n\n.cropper-hide {\n  display: block;\n  height: 0;\n  position: absolute;\n  width: 0;\n}\n\n.cropper-hidden {\n  display: none !important;\n}\n\n.cropper-move {\n  cursor: move;\n}\n\n.cropper-crop {\n  cursor: crosshair;\n}\n\n.cropper-disabled .cropper-drag-box,\n.cropper-disabled .cropper-face,\n.cropper-disabled .cropper-line,\n.cropper-disabled .cropper-point {\n  cursor: not-allowed;\n}\n";
  n(css,{});

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
        required: true,
      },

      uploadHandler: {
        type: Function,
      },

      uploadUrl: {
        type: String,
      },

      requestMethod: {
        type: String,
        default: 'POST',
      },

      uploadHeaders: {
        type: Object,
      },

      uploadFormName: {
        type: String,
        default: 'file',
      },

      uploadFormData: {
        type: Object,
        default() {
          return {}
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

      withCredentials: {
        type: Boolean,
        default: false,
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
        return this.mimes.trim().toLowerCase()
      },
    },

    watch: {
      trigger(value) {
        if (!value) return

        this.pickImage();
        this.$emit('triggered', false);
      },
    },

    mounted() {
      this.$emit('triggered', false);
    },

    methods: {
      destroy() {
        if (this.cropper) this.cropper.destroy();

        this.$refs.input.value = '';
        this.dataUrl = undefined;
      },

      submit() {
        this.$emit('submit');

        if (this.uploadUrl) {
          this.uploadImage();
        } else if (this.uploadHandler) {
          this.uploadHandler(this.cropper);
        } else {
          this.$emit('error', 'No upload handler found.', 'user');
        }

        this.destroy();
      },

      cancel(){
          this.$emit('cancel');
          this.destroy();
      },

      onImgElementError() {
        this.$emit('error', 'File loading failed.', 'load');
        this.destroy();
      },

      pickImage() {
        this.$refs.input.click();
      },

      onFileInputChange(e) {
        if (e.target.files !== null && e.target.files[0] !== null) {
          const file = e.target.files[0];

          if (this.cleanedMimes === 'image/*') {
            if (file.type.split('/')[0] !== 'image') {
              this.$emit('error', 'File type not correct.', 'user');
              return
            }
          } else {
            const correctType = this.cleanedMimes.split(', ').find((mime) => mime === file.type);

            if (!correctType) {
              this.$emit('error', 'File type not correct.', 'user');
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
          this.$emit('changed', file, reader);
        }
      },

      createCropper() {
        this.cropper = new Cropper__default['default'](this.$refs.img, this.cropperOptions);
      },

      uploadImage() {
        this.cropper.getCroppedCanvas(this.outputOptions).toBlob(
          (blob) => {
            const form = new FormData();
            const xhr = new XMLHttpRequest();
            const data = Object.assign({}, this.uploadFormData);

            xhr.withCredentials = this.withCredentials;

            for (const key in data) {
              form.append(key, data[key]);
            }

            form.append(this.uploadFormName, blob, this.filename);

            this.$emit('uploading', form, xhr);

            xhr.open(this.requestMethod, this.uploadUrl, true);

            for (const header in this.uploadHeaders) {
              xhr.setRequestHeader(header, this.uploadHeaders[header]);
            }

            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                let response = '';

                try {
                  response = JSON.parse(xhr.responseText);
                } catch (err) {
                  response = xhr.responseText;
                }

                this.$emit('completed', response, form, xhr);

                if ([200, 201, 204].indexOf(xhr.status) > -1) {
                  this.$emit('uploaded', response, form, xhr);
                } else {
                  this.$emit('error', 'Image upload fail.', 'upload', xhr);
                }
              }
            };

            xhr.send(form);
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
                        return _vm.createCropper($event)
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
                      domProps: { textContent: _vm._s(_vm.labels.cancel) },
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.cancel($event)
                        }
                      }
                    },
                    [_vm._v(" Cancel ")]
                  ),
                  _c(
                    "button",
                    {
                      staticClass: "avatar-cropper-btn",
                      domProps: { textContent: _vm._s(_vm.labels.submit) },
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.submit($event)
                        }
                      }
                    },
                    [_vm._v(" Submit ")]
                  )
                ])
              ])
            ]
          )
        : _vm._e(),
      _c("input", {
        ref: "input",
        staticClass: "avatar-cropper-img-input",
        attrs: { accept: _vm.cleanedMimes, capture: _vm.capture, type: "file" },
        on: { change: _vm.onFileInputChange }
      })
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-2f0688ea_0", { source: ".avatar-cropper .avatar-cropper-overlay {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.avatar-cropper .avatar-cropper-overlay-inline {\n  position: initial;\n}\n.avatar-cropper .avatar-cropper-img-input {\n  display: none;\n}\n.avatar-cropper .avatar-cropper-close {\n  float: right;\n  padding: 20px;\n  font-size: 3rem;\n  color: #fff;\n  font-weight: 100;\n  text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n}\n.avatar-cropper .avatar-cropper-mark {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.avatar-cropper .avatar-cropper-container {\n  background: #fff;\n  z-index: 999;\n  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-image-container {\n  position: relative;\n  max-width: 400px;\n  height: 300px;\n}\n.avatar-cropper .avatar-cropper-container img {\n  max-width: 100%;\n  height: 100%;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer {\n  display: flex;\n  align-items: stretch;\n  align-content: stretch;\n  justify-content: space-between;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn {\n  width: 50%;\n  padding: 15px 0;\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  outline: none;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {\n  background-color: #2aabd2;\n  color: #fff;\n}\n\n/*# sourceMappingURL=vue-avatar-cropper.vue.map */", map: {"version":3,"sources":["/home/ferretwithaberet/Projects/Github/vue-avatar-cropper/src/vue-avatar-cropper.vue","vue-avatar-cropper.vue"],"names":[],"mappings":"AA2TA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,cAAA;AC1TA;AD6TA;EACA,iBAAA;AC3TA;AD8TA;EACA,aAAA;AC5TA;AD+TA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,0CAAA;AC7TA;ADgUA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,8BAAA;AC9TA;ADiUA;EACA,gBAAA;EACA,YAAA;EACA,iDAAA;AC/TA;ADiUA;EACA,kBAAA;EACA,gBAAA;EACA,aAAA;AC/TA;ADkUA;EACA,eAAA;EACA,YAAA;AChUA;ADmUA;EACA,aAAA;EACA,oBAAA;EACA,sBAAA;EACA,8BAAA;ACjUA;ADmUA;EACA,UAAA;EACA,eAAA;EACA,eAAA;EACA,YAAA;EACA,uBAAA;EACA,aAAA;ACjUA;ADmUA;EACA,yBAAA;EACA,WAAA;ACjUA;;AAEA,iDAAiD","file":"vue-avatar-cropper.vue","sourcesContent":["<template>\n  <div class=\"avatar-cropper\">\n    <div\n      class=\"avatar-cropper-overlay\"\n      :class=\"{'avatar-cropper-overlay-inline': inline}\"\n      v-if=\"dataUrl\"\n    >\n      <div class=\"avatar-cropper-mark\" v-if=\"!inline\">\n        <a\n          @click=\"cancel\"\n          class=\"avatar-cropper-close\"\n          :title=\"labels.cancel\"\n          href=\"javascript:;\"\n        >&times;</a>\n      </div>\n\n      <div class=\"avatar-cropper-container\">\n        <div class=\"avatar-cropper-image-container\">\n          <img\n            ref=\"img\"\n            :src=\"dataUrl\"\n            alt\n            @load.stop=\"createCropper\"\n            @error=\"onImgElementError\"\n          />\n        </div>\n\n        <div class=\"avatar-cropper-footer\">\n          <button\n            @click.stop.prevent=\"cancel\"\n            class=\"avatar-cropper-btn\"\n            v-text=\"labels.cancel\"\n          >\n            Cancel\n          </button>\n\n          <button\n            @click.stop.prevent=\"submit\"\n            class=\"avatar-cropper-btn\"\n            v-text=\"labels.submit\"\n          >\n            Submit\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <input\n      :accept=\"cleanedMimes\"\n      :capture=\"capture\"\n      class=\"avatar-cropper-img-input\"\n      ref=\"input\"\n      type=\"file\"\n      @change=\"onFileInputChange\"\n    />\n  </div>\n</template>\n\n<script>\nimport 'cropperjs/dist/cropper.css'\nimport Cropper from 'cropperjs'\n\nexport default {\n  name: 'AvatarCropper',\n\n  model: {\n    prop: 'trigger',\n    event: 'triggered',\n  },\n\n  props: {\n    trigger: {\n      type: Boolean,\n      default: false,\n      required: true,\n    },\n\n    uploadHandler: {\n      type: Function,\n    },\n\n    uploadUrl: {\n      type: String,\n    },\n\n    requestMethod: {\n      type: String,\n      default: 'POST',\n    },\n\n    uploadHeaders: {\n      type: Object,\n    },\n\n    uploadFormName: {\n      type: String,\n      default: 'file',\n    },\n\n    uploadFormData: {\n      type: Object,\n      default() {\n        return {}\n      },\n    },\n\n    cropperOptions: {\n      type: Object,\n      default() {\n        return {\n          aspectRatio: 1,\n          autoCropArea: 1,\n          viewMode: 1,\n          movable: false,\n          zoomable: false,\n        }\n      },\n    },\n\n    outputOptions: {\n      type: Object,\n    },\n\n    outputMime: {\n      type: String,\n      default: null,\n    },\n    outputQuality: {\n      type: Number,\n      default: 0.9,\n    },\n\n    mimes: {\n      type: String,\n      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',\n    },\n\n    capture: {\n      type: String,\n    },\n\n    labels: {\n      type: Object,\n      default() {\n        return {\n          submit: 'Ok',\n          cancel: 'Cancel',\n        }\n      },\n    },\n\n    withCredentials: {\n      type: Boolean,\n      default: false,\n    },\n\n    inline: {\n      type: Boolean,\n      default: false,\n    },\n  },\n\n  data() {\n    return {\n      cropper: undefined,\n      dataUrl: undefined,\n      filename: undefined,\n    }\n  },\n\n  computed: {\n    cleanedMimes() {\n      return this.mimes.trim().toLowerCase()\n    },\n  },\n\n  watch: {\n    trigger(value) {\n      if (!value) return\n\n      this.pickImage()\n      this.$emit('triggered', false)\n    },\n  },\n\n  mounted() {\n    this.$emit('triggered', false)\n  },\n\n  methods: {\n    destroy() {\n      if (this.cropper) this.cropper.destroy()\n\n      this.$refs.input.value = ''\n      this.dataUrl = undefined\n    },\n\n    submit() {\n      this.$emit('submit')\n\n      if (this.uploadUrl) {\n        this.uploadImage()\n      } else if (this.uploadHandler) {\n        this.uploadHandler(this.cropper)\n      } else {\n        this.$emit('error', 'No upload handler found.', 'user')\n      }\n\n      this.destroy()\n    },\n\n    cancel(){\n        this.$emit('cancel')\n        this.destroy()\n    },\n\n    onImgElementError() {\n      this.$emit('error', 'File loading failed.', 'load')\n      this.destroy()\n    },\n\n    pickImage() {\n      this.$refs.input.click()\n    },\n\n    onFileInputChange(e) {\n      if (e.target.files !== null && e.target.files[0] !== null) {\n        const file = e.target.files[0]\n\n        if (this.cleanedMimes === 'image/*') {\n          if (file.type.split('/')[0] !== 'image') {\n            this.$emit('error', 'File type not correct.', 'user')\n            return\n          }\n        } else {\n          const correctType = this.cleanedMimes.split(', ').find((mime) => mime === file.type)\n\n          if (!correctType) {\n            this.$emit('error', 'File type not correct.', 'user')\n            return\n          }\n        }\n\n        const reader = new FileReader()\n        reader.onload = (e) => {\n          this.dataUrl = e.target.result\n        }\n\n        reader.readAsDataURL(file)\n\n        this.filename = file.name || 'unknown'\n        this.mimeType = this.mimeType || file.type\n        this.$emit('changed', file, reader)\n      }\n    },\n\n    createCropper() {\n      this.cropper = new Cropper(this.$refs.img, this.cropperOptions)\n    },\n\n    uploadImage() {\n      this.cropper.getCroppedCanvas(this.outputOptions).toBlob(\n        (blob) => {\n          const form = new FormData()\n          const xhr = new XMLHttpRequest()\n          const data = Object.assign({}, this.uploadFormData)\n\n          xhr.withCredentials = this.withCredentials\n\n          for (const key in data) {\n            form.append(key, data[key])\n          }\n\n          form.append(this.uploadFormName, blob, this.filename)\n\n          this.$emit('uploading', form, xhr)\n\n          xhr.open(this.requestMethod, this.uploadUrl, true)\n\n          for (const header in this.uploadHeaders) {\n            xhr.setRequestHeader(header, this.uploadHeaders[header])\n          }\n\n          xhr.onreadystatechange = () => {\n            if (xhr.readyState === 4) {\n              let response = ''\n\n              try {\n                response = JSON.parse(xhr.responseText)\n              } catch (err) {\n                response = xhr.responseText\n              }\n\n              this.$emit('completed', response, form, xhr)\n\n              if ([200, 201, 204].indexOf(xhr.status) > -1) {\n                this.$emit('uploaded', response, form, xhr)\n              } else {\n                this.$emit('error', 'Image upload fail.', 'upload', xhr)\n              }\n            }\n          }\n\n          xhr.send(form)\n        },\n        this.outputMime,\n        this.outputQuality,\n      )\n    },\n  },\n}\n</script>\n\n<style lang=\"scss\">\n.avatar-cropper {\n  .avatar-cropper-overlay {\n    text-align: center;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 99999;\n  }\n\n  .avatar-cropper-overlay-inline{\n    position: initial;\n  }\n\n  .avatar-cropper-img-input {\n    display: none;\n  }\n\n  .avatar-cropper-close {\n    float: right;\n    padding: 20px;\n    font-size: 3rem;\n    color: #fff;\n    font-weight: 100;\n    text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n  }\n\n  .avatar-cropper-mark {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.1);\n  }\n\n  .avatar-cropper-container {\n    background: #fff;\n    z-index: 999;\n    box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n\n    .avatar-cropper-image-container {\n      position: relative;\n      max-width: 400px;\n      height: 300px;\n    }\n\n    img {\n      max-width: 100%;\n      height: 100%;\n    }\n\n    .avatar-cropper-footer {\n      display: flex;\n      align-items: stretch;\n      align-content: stretch;\n      justify-content: space-between;\n\n      .avatar-cropper-btn {\n        width: 50%;\n        padding: 15px 0;\n        cursor: pointer;\n        border: none;\n        background: transparent;\n        outline: none;\n\n        &:hover {\n          background-color: #2aabd2;\n          color: #fff;\n        }\n      }\n    }\n  }\n}\n</style>\n",".avatar-cropper .avatar-cropper-overlay {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.avatar-cropper .avatar-cropper-overlay-inline {\n  position: initial;\n}\n.avatar-cropper .avatar-cropper-img-input {\n  display: none;\n}\n.avatar-cropper .avatar-cropper-close {\n  float: right;\n  padding: 20px;\n  font-size: 3rem;\n  color: #fff;\n  font-weight: 100;\n  text-shadow: 0px 1px rgba(40, 40, 40, 0.3);\n}\n.avatar-cropper .avatar-cropper-mark {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.1);\n}\n.avatar-cropper .avatar-cropper-container {\n  background: #fff;\n  z-index: 999;\n  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14);\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-image-container {\n  position: relative;\n  max-width: 400px;\n  height: 300px;\n}\n.avatar-cropper .avatar-cropper-container img {\n  max-width: 100%;\n  height: 100%;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer {\n  display: flex;\n  align-items: stretch;\n  align-content: stretch;\n  justify-content: space-between;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn {\n  width: 50%;\n  padding: 15px 0;\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  outline: none;\n}\n.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {\n  background-color: #2aabd2;\n  color: #fff;\n}\n\n/*# sourceMappingURL=vue-avatar-cropper.vue.map */"]}, media: undefined });

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
