<h1 align="center">Vue Avatar Cropper</h1>

<p align="center"> :girl: A simple and elegant avatar cropping and upload plugin.</p>

![image](https://user-images.githubusercontent.com/1472352/28398207-b32907b0-6d38-11e7-998a-32d34362b341.png)

## Installing

```shell
$  npm i vue-avatar-cropper --save-dev
```

## Usage

```js
import AvatarCropper from 'vue-avatar-cropper'
```

```html
<button type="button" class="btn btn-primary" id="set-avatar">Update avatar</button>

<avatar-cropper
    trigger="#set-avatar"
    upload-url="/files/upload"
></avatar-cropper>
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

- `uploading` before submit xhr request, params:
    - `form` object, FormData instance.
    - `xhr`  object, XMLHttpRequest instance.

- `uploaded` after request, params:
    - `response` object, json parsed from `xhr.responseText`
    - `form` object, FormData instance.
    - `xhr`  object, XMLHttpRequest instance.

You can listen these events like this:

```html
<avatar-cropper
    trigger="#set-avatar"
    upload-url="/files/upload"
    @uploading="handleUploading"
    @uploaded="handleUploaded"
></avatar-cropper>
```

```js
    ...
    methods: {
        ...
        handleUploading(form. xhr) {
            form.append('foo', 'bar')
        },
        handleUploaded(response, form, xhr) {
            // update user avatar attribute
        }
        ...
    }
    ...
```

## License

MIT
