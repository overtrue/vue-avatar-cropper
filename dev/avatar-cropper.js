(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cropperjs'), require('cropperjs/dist/cropper.css'), require('mime/lite'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['cropperjs', 'cropperjs/dist/cropper.css', 'mime/lite', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AvatarCropper = factory(global.Cropper, null, global.mime, global.Vue));
})(this, (function (Cropper, cropper_css, mime, vue) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Cropper__default = /*#__PURE__*/_interopDefaultLegacy(Cropper);
  var mime__default = /*#__PURE__*/_interopDefaultLegacy(mime);

  var script = vue.defineComponent({
    name: 'AvatarCropper',

    emits: [
      'update:modelValue',
      'submit',
      'error',
      'cancel',
      'changed',
      'uploading',
      'completed',
      'uploaded',
    ],

    props: {
      modelValue: {
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

      uploadFileName: {
        type: [String, Function],
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
        fileName: undefined,
        mimeType: undefined,
      }
    },

    computed: {
      cleanedMimes() {
        if (!this.mimes)
          throw new Error('vue-avatar-cropper: mimes prop cannot be empty')

        return this.mimes.trim().toLowerCase()
      },
    },

    watch: {
      modelValue(value) {
        if (!value) return

        if (this.file) {
          this.onFileChange(this.file);
        } else {
          this.pickImage();
        }

        this.$emit('update:modelValue', false);
      },
    },

    mounted() {
      this.$emit('update:modelValue', false);
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

      cancel() {
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

        this.fileName = file.name || 'unknown';
        this.mimeType = file.type;

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
        this.cropper = new Cropper__default["default"](this.$refs.img, this.cropperOptions);
      },

      getFilename(blob) {
        const extension = mime__default["default"].getExtension(blob.type);

        // Default logic
        if (!this.uploadFileName) {
          let actualFilename = this.fileName;

          const filenameParts = this.fileName.split('.');
          if (filenameParts.length > 1)
            actualFilename = filenameParts.slice(0, -1).join('.');

          return `${actualFilename}.${extension}`
        }

        // User provided filename
        if (typeof this.uploadFileName === 'string') return this.uploadFileName

        if (typeof this.uploadFileName === 'function')
          return this.uploadFileName({
            filename: this.fileName,
            mime: blob.type,
            extension,
          })

        return `unknown.${extension}`
      },

      uploadImage() {
        this.cropper.getCroppedCanvas(this.outputOptions).toBlob(
          async (blob) => {
            const form = new FormData();

            for (const [key, value] of this.uploadFormData.entries()) {
              form.append(key, value);
            }

            form.append(this.uploadFileField, blob, this.getFilename(blob));

            const requestOptions = Object.assign(
              {
                body: form,
              },
              this.requestOptions,
            );

            const request = new Request(this.uploadUrl, requestOptions);

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
          this.outputMime || this.mimeType,
          this.outputQuality,
        );
      },
    },
  });

  const _hoisted_1 = { class: "avatar-cropper" };
  const _hoisted_2 = {
    key: 0,
    class: "avatar-cropper-mark"
  };
  const _hoisted_3 = ["title"];
  const _hoisted_4 = { class: "avatar-cropper-container" };
  const _hoisted_5 = { class: "avatar-cropper-image-container" };
  const _hoisted_6 = ["src"];
  const _hoisted_7 = { class: "avatar-cropper-footer" };
  const _hoisted_8 = ["accept", "capture"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      (_ctx.dataUrl)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(["avatar-cropper-overlay", { 'avatar-cropper-overlay-inline': _ctx.inline }])
          }, [
            (!_ctx.inline)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                  vue.createElementVNode("a", {
                    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.cancel && _ctx.cancel(...args))),
                    class: "avatar-cropper-close",
                    title: _ctx.labels.cancel,
                    href: "javascript:;"
                  }, " × ", 8 /* PROPS */, _hoisted_3)
                ]))
              : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", _hoisted_4, [
              vue.createElementVNode("div", _hoisted_5, [
                vue.createElementVNode("img", {
                  ref: "img",
                  src: _ctx.dataUrl,
                  alt: "",
                  onLoad: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.createCropper && _ctx.createCropper(...args)), ["stop"])),
                  onError: _cache[2] || (_cache[2] = (...args) => (_ctx.onImgElementError && _ctx.onImgElementError(...args)))
                }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_6)
              ]),
              vue.renderSlot(_ctx.$slots, "default"),
              vue.createElementVNode("div", _hoisted_7, [
                vue.createElementVNode("button", {
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => (_ctx.cancel && _ctx.cancel(...args)), ["stop","prevent"])),
                  class: "avatar-cropper-btn"
                }, vue.toDisplayString(_ctx.labels.cancel), 1 /* TEXT */),
                vue.createElementVNode("button", {
                  onClick: _cache[4] || (_cache[4] = vue.withModifiers((...args) => (_ctx.submit && _ctx.submit(...args)), ["stop","prevent"])),
                  class: "avatar-cropper-btn"
                }, vue.toDisplayString(_ctx.labels.submit), 1 /* TEXT */)
              ])
            ])
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true),
      (!_ctx.file)
        ? (vue.openBlock(), vue.createElementBlock("input", {
            key: 1,
            accept: _ctx.cleanedMimes,
            capture: _ctx.capture,
            class: "avatar-cropper-img-input",
            ref: "input",
            type: "file",
            onChange: _cache[5] || (_cache[5] = (...args) => (_ctx.onFileInputChange && _ctx.onFileInputChange(...args)))
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_8))
        : vue.createCommentVNode("v-if", true)
    ]))
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".avatar-cropper .avatar-cropper-overlay {\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999; }\n\n.avatar-cropper .avatar-cropper-overlay-inline {\n  position: initial; }\n\n.avatar-cropper .avatar-cropper-img-input {\n  display: none; }\n\n.avatar-cropper .avatar-cropper-close {\n  float: right;\n  padding: 20px;\n  font-size: 3rem;\n  color: #fff;\n  font-weight: 100;\n  text-shadow: 0px 1px rgba(40, 40, 40, 0.3); }\n\n.avatar-cropper .avatar-cropper-mark {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.1); }\n\n.avatar-cropper .avatar-cropper-container {\n  background: #fff;\n  z-index: 999;\n  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.14); }\n  .avatar-cropper .avatar-cropper-container .avatar-cropper-image-container {\n    position: relative;\n    max-width: 400px;\n    height: 300px; }\n  .avatar-cropper .avatar-cropper-container img {\n    max-width: 100%;\n    height: 100%; }\n  .avatar-cropper .avatar-cropper-container .avatar-cropper-footer {\n    display: flex;\n    align-items: stretch;\n    align-content: stretch;\n    justify-content: space-between; }\n    .avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn {\n      width: 50%;\n      padding: 15px 0;\n      cursor: pointer;\n      border: none;\n      background: transparent;\n      outline: none; }\n      .avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {\n        background-color: #2aabd2;\n        color: #fff; }\n";
  styleInject(css_248z);

  script.render = render;
  script.__file = "src/AvatarCropper.vue";

  script.install = (Vue) => {
    Vue.component('avatar-cropper', script);
  };

  return script;

}));
