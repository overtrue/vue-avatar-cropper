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
- | - | -
`trigger` | Boolean | Set to true to trigger the avatar cropper, this prop is used for `v-model`. Default: `false`
`file` | File | File to use instead of prompting the user to upload one
`upload-url` | String | URL to upload the file to
`upload-file-field` | String | `FormData` field to use for the file. Default: `'file'`
`upload-form-data` | FormData | Additional [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData). Default: `new FormData()`
`upload-handler` | Function | Handler to replace default upload handler, the argument is [cropperJS](https://github.com/fengyuanchen/cropperjs) instance.
`request-options` | Object | Options passed to the `init` parameter of the [Request()](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) constructor. Use this to set the method, headers, etc. Default: `{ method: 'POST' }`
`cropper-options` | Object | Options passed to the [cropperJS](https://github.com/fengyuanchen/cropperjs#options) instance. <br>Default: `{`
 | | | &nbsp;&nbsp;&nbsp;&nbsp;`aspectRatio: 1,`
 | | | &nbsp;&nbsp;&nbsp;&nbsp;`autoCropArea: 1,`
 | | | &nbsp;&nbsp;&nbsp;&nbsp;`viewMode: 1,`
 | | | &nbsp;&nbsp;&nbsp;&nbsp;`movable: false,`
 | | | &nbsp;&nbsp;&nbsp;&nbsp;`zoomable: false`
 | | | `}`
`output-options` | Object | Options passed to the [cropper.getCroppedCanvas()](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) method. <br>Default: `{}`. Recommended use-case is specifying an output size, for instance: `{ width: 512, height: 512 }`
`output-mime` | String | The resulting avatar image mime type. Default: `null`
`output-quality` | Number | The resulting avatar image quality [0 - 1]. Default: `0.9`<br>(if the output-mime property is `'image/jpeg'` or `'image/webp'`)
`mimes` | String | Allowed image formats. Default: <br>`'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'`
`capture` | String | Capture attribute for the file input. Forces mobile users to take a new picture with the back(Use value `'environment'`) or front(Use value `'user'`) camera
`labels` | Object | Label for buttons. Default: `{ submit: 'Ok', cancel: 'Cancel' }`
`inline` | Boolean | If true component will be displayed as inline elemenet. Default: `false`

### Events

- **triggered** `trigger` prop changed, used for `v-model`, parameter:
  - `value` boolean.

- **changed** user picked a file, parameter is an object containing:
  - `file` object, [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) object.
  - `reader` object, [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

- **submit** right after a click on the submit button

- **cancel** when user decides to cancel the upload

- **uploading** before submit upload request, parameter is an object containing:
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `request` object, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) instance.
  - `response` object, [Promise<Response>](https://developer.mozilla.org/en-US/docs/Web/API/Response)

- **uploaded** after request is successful, parameter is an object containing:
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `request` object, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) instance.
  - `response` object, [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

- **completed** after request has completed, parameter is an object containing:
  - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
  - `request` object, [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) instance.
  - `response` object, [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

- **error** something went wrong, parameter is an object containing:
  - `message` error message.
  - `type` error type, example: `'load'`/`'upload'`/`'user'`.
  - `context` context data.

You can listen for these events like this:

```html
<avatar-cropper
  v-model="trigger"
  upload-url="/files/upload"
  @uploading="handleUploading"
  @uploaded="handleUploaded"
  @completed="handleCompleted"
  @error="handleError"
/>
```

```js
export default {
  //...
  methods: {
    ...
    handleUploading({ form, request, response }) {
      // show a loader
    },

    handleUploaded({ form, request, response }) {
      // update user avatar attribute
    },

    handleCompleted({ form, request, response }) {
      // close the loader
    },

    handleError({ message, type, context}) {
      if (type === 'upload') {
        const { request, response } = context
      }
    }
  },
}
```

:rocket: There is an online demo:

[![Edit test-project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-avatar-cropper-demo-dptno)

## License

MIT
