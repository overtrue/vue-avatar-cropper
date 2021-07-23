<h1 align="center">Vue Avatar Cropper</h1>

<p align="center"> :girl: A simple and elegant component to crop and upload avatars.</p>

![image](https://user-images.githubusercontent.com/1472352/28398207-b32907b0-6d38-11e7-998a-32d34362b341.png)

[![Edit test-project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-avatar-cropper-demo-dptno)

## Basic usage

```html
<button @click="() => { trigger = true }">Pick avatar</button>

<avatar-cropper
  v-model="trigger"
  upload-url="/files/upload"
  @uploaded="handleUploaded"
/>
```

## Installing

### Browsers

1. Include the link to AvatarCropper in `<head>` alongside Vue.js and Cropper.js:

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cropperjs/dist/cropper.min.css">
   <script src="https://cdn.jsdelivr.net/npm/cropperjs"></script>
   <script src="https://cdn.jsdelivr.net/npm/vue"></script>
   <script src="https://cdn.jsdelivr.net/npm/vue-avatar-cropper"></script>
   ```

2. AvatarCropper will auto-install upon detecting the global Vue instance. You can use it right away.

### Node environment

1. Install the AvatarCropper package:

   ```sh
   npm install vue-avatar-cropper
   # or
   yarn add vue-avatar-cropper
   ```

2. Register it as you usually would:

   ```js
   import AvatarCropper from 'vue-avatar-cropper'

   // or
   const AvatarCropper = require('vue-avatar-cropper');


   Vue.component('AvatarCropper', AvatarCropper);

   // or
   Vue.use(AvatarCropper);

   // or
   new Vue({
       components: { AvatarCropper },
       // ...
   });
   ```

### Props

 Property Name | Type | Description
 -------- | -------- | --------
 `trigger` | Boolean | Set to true to trigger the avatar cropper, this prop is used for `v-model`, default: `false`
 `file` | File | File to use instead of prompting the user to upload one
 `upload-url` | String | URL to upload the file to
 `upload-form-name` | String | Form name of upload request, default: 'file'
 `upload-form-data` | Object | Additional form data, default: `{}`
 `upload-handler` | Function | Handler to replace default upload handler, the argument is [cropperJS](https://github.com/fengyuanchen/cropperjs) instance.
 `upload-headers` | Object | Headers of upload request, default: `{}`
 `request-method` | String | Request method to use when uploading, default: `'POST'`
 `cropper-options` | Object | Options passed to the [cropperJS](https://github.com/fengyuanchen/cropperjs#options) instance, <br>default: `{`
   | | |    `aspectRatio: 1,`
   | | |    `autoCropArea: 1,`
   | | |    `viewMode: 1,`
   | | |    `movable: false,`
   | | |    `zoomable: false`
   | | |    `}`
 `output-options` | Object | Options passed to the [cropper.getCroppedCanvas()](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) method, <br>default: `{}`. Recommended use-case is specifying an output size, for instance: `{ width: 512, height: 512 }`
 `output-mime` | String | The resulting avatar image mime type, default: `null`
 `output-quality` | Number | The resulting avatar image quality [0 - 1], default: `0.9`<br>(if the output-mime property is `'image/jpeg'` or `'image/webp'`)
 `mimes` | String | Allowed image formats, default: <br>`'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'`
 `capture` | String | Capture attribute for the file input. Forces mobile users to take a new picture with the back(Use value `'environment'`) or front(Use value `'user'`) camera
 `labels` | Object | Label for buttons, default: `{ submit: '提交', cancel: '取消'}`
 `with-credentials` | Boolean | The `with-credentials` property that indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates, default: `false`
 `inline` | Boolean | If true component will be displayed as inline elemenet, default: `false`

### Events

- **triggered** `trigger` prop changed, used for `v-model`
  - `value` boolean.

- **changed** user picked a file
  - `file` object, [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) object.
  - `reader` object, [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

- **submit** right after a click on the submit button

- **cancel** when user decides to cancel the upload

- **uploading** before submit upload request, params:
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `xhr`  object, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance.

- **uploaded** after request is successful, params:
  - `response` object, json parsed from `xhr.responseText`
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `xhr`  object, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance.

- **completed** after request has completed, params:
  - `response` object, json parsed from `xhr.responseText`
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `xhr`  object, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance.

- **error** something went wrong, params:
  - `message` error message.
  - `type` error type, example: `'load'`/`'upload'`/`'user'`.
  - `context` context data.

You can listen to these events like this:

```html
<avatar-cropper
  v-model="trigger"
  upload-url="/files/upload"
  @uploading="handleUploading"
  @uploaded="handleUploaded"
  @completed="handleCompleted"
  @error="handlerError"
/>
```

```js
export default {
  //...
  methods: {
    ...
    handleUploading(form, xhr) {
      form.append('foo', 'bar')
    },
    handleUploaded(response, form, xhr) {
      // update user avatar attribute
    },
    handleCompleted(response, form, xhr) {
      // xhr.status
    },
    handlerError(message, type, xhr) {
      if (type == 'upload') {
        // xhr.response...
      }
    }
  },
}
```

:rocket: There is an online demo:

[![Edit test-project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-avatar-cropper-demo-dptno)

## License

MIT
