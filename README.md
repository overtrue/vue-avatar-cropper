<h1 align="center">Vue Avatar Cropper</h1>

<p align="center"> :girl: A simple and elegant avatar cropping and upload plugin.</p>

![image](https://user-images.githubusercontent.com/1472352/28398207-b32907b0-6d38-11e7-998a-32d34362b341.png)

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
 `upload-handler` | Function | Handler to replace default upload handler
 `upload-headers` | Object | Headers of upload request, default: `{}`
 `mimes` | String | Allowed image formats, default: <br>`image/png, image/gif, image/jpeg, image/bmp, image/x-icon`
 `labels` | Object | Label for buttons, default: `{ submit: "提交", cancel: "取消"}`

### Events

- **submit** right after a click on the submit button

- **uploading** before submit upload request, params:
    - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
    - `xhr`  object, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance.

- **uploaded** after request has completed, params:
    - `response` object, json parsed from `xhr.responseText`
    - `form` object, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance.
    - `xhr`  object, [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance.

- **completed** after request is successful, params:
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

## License

MIT
