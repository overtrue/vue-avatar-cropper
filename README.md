<h1 align="center">Vue Avatar Cropper</h1>

<p align="center">A simple and elegant avatar cropping and upload plugin.</p>

---

## Installing

```shell
$  npm i vue-avatar-cropper -save-dev
```

## Usage

```js
import AvatarCropper from 'vue-avatar-cropper'
```

```html
<img src="/user/avatar.jpg" alt="">
<button type="button" class="btn btn-primary" id="set-avatar">Update avatar</button>

<avatar-cropper
    trigger="#set-avatar"
    upload-url="/files/upload"
    :uploaded="updateUserAvatar"
></avatar-cropper>
```

### Properties

| Property | Type | Description | Default |
| :------: | :------: | :------: | :------: |
| trigger | String | Element | The element to trigger avatar pick | null |
| upload-url | String | The url to upload croppped image | null |
| uploaded | Function | The handler to handle uploaded event | null |
| upload-form-name | Object | Form name of upload request | 'file' |
| upload-handler | Function | The handler to handle upload replace default upload handler | null |
| upload-headers | Object | Headers to append to upload request | {} |
| mimes | String | Allowed image formats | 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' |

## License

MIT
