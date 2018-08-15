<h1 align="center">Vue Avatar Cropper</h1>

<p align="center"> :girl: A simple and elegant avatar cropping and upload plugin.</p>

![image](https://user-images.githubusercontent.com/1472352/28398207-b32907b0-6d38-11e7-998a-32d34362b341.png)

[![Edit test-project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/overtrue/vue-avatar-cropper-demo/tree/master/)

## Installing

```shell
$  npm i vue-avatar-cropper
```

## Usage

```vue
<template>
  <div class="text-center">
    <img v-if="userAvatar" :src="userAvatar">
    <button id="pick-avatar">Select an image</button>
    <avatar-cropper
      @uploaded="handleUploaded"
      trigger="#pick-avatar"
      upload-url="/files/upload" />
  </div>
</template>

<script>
  import AvatarCropper from "vue-avatar-cropper"

  export default {
    components: { AvatarCropper },
    data() {
      return {
          userAvatar: undefined,
      }
    },
    methods: {
      handleUploaded(resp) {
        this.userAvatar = resp.relative_url;
      }
    }
  }
</script>
```

### Properties

 Property Name | Type | Description
 -------- | -------- | --------
 `trigger` | String\|Element | The element to trigger avatar pick
 `upload-url` | String | Url of upload croppped image
 `upload-form-name` | Object | Form name of upload request, default: 'file'
 `upload-form-data` | Object | Additional form data, default: '{}'
 `upload-handler` | Function | Handler to replace default upload handler, the argument is [cropperJS](https://github.com/fengyuanchen/cropperjs) instance.
 `upload-headers` | Object | Headers of upload request, default: `{}`
 `cropper-options` | Object | Options passed to the [cropperJS](https://github.com/fengyuanchen/cropperjs#options) instance, <br>default: `{` 
   | | |    `aspectRatio: 1, `
   | | |    `autoCropArea: 1, `
   | | |    `viewMode: 1,`
   | | |    `movable: false,`
   | | |    `zoomable: false`
   | | |    `}`
 `output-options` | Object | Options passed to the [cropper.getCroppedCanvas()](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) method, <br>default: `{width: 512, height: 512}`
 `output-mime` | String | The resulting avatar image mime type, default: `image/jpeg`
 `output-quality` | Number | The resulting avatar image quality [0 - 1], default: `0.9`<br>(if the output-mime property is `image/jpeg` or `image/webp`)
 `mimes` | String | Allowed image formats, default: <br>`image/png, image/gif, image/jpeg, image/bmp, image/x-icon`
 `labels` | Object | Label for buttons, default: `{ submit: "提交", cancel: "取消"}`

### Events

- **changed** user picked a file
    - `file` object, [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) object.
    - `reader` object, [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

- **submit** right after a click on the submit button

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
  - `type` error type, example: `upload`/`user`.
  - `context` context data.

You can listen these events like this:


```html
<avatar-cropper
    trigger="#set-avatar"
    upload-url="/files/upload"
    @uploading="handleUploading"
    @uploaded="handleUploaded"
    @completed="handleCompleted"
    @error="handlerError"
></avatar-cropper>
```

```js
    ...
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
        ...
    }
    ...
```

:rocket: There is an online demo:

[![Edit test-project](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/overtrue/vue-avatar-cropper-demo/tree/master/)

## License

MIT
