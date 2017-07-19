<template>
  <div class="avatar-cropper" v-if="dataUrl">
    <div class="avatar-cropper-mark"><a href="javascript:;" class="avatar-cropper-close" @click="destroy">&times;</a></div>
    <div class="avatar-cropper-container">
      <div class="avatar-cropper-image-container">
        <img :src="dataUrl" alt="" @load.stop="createCropper" />
      </div>
      <div class="avatar-cropper-footer">
        <button class="avatar-cropper-btn" @click="destroy">取消</button>
        <button class="avatar-cropper-btn" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import 'cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'

  export default {
    props: {
      delegate: {
        type: [String, Element],
        required: true
      },
      uploadHandler: {
        type: Function,
      },
      uploadUrl: {
        type: String,
      },
      uploadHeaders: {
        type: Object,
      },
      uploadFormName: {
        type: String,
        default: 'file'
      },
      uploaded: {
        type: Function,
        required: true
      },
      mimes: {
        type: String,
        default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
      }
    },
    data() {
      return {
        cropper: undefined,
        dataUrl: undefined
      }
    },
    methods: {
      destroy() {
        this.cropper.destroy()
        this.dataUrl = undefined
      },
      submit() {
        if (this.uploadUrl) {
          this.uploadImage(this.uploaded)
        } else if (this.uploadHandler) {
          this.uploadHandler(this.cropper)
        } else {
          throw new Error('No upload handler found.')
        }
      },
      pickImage() {
        let id = 'avatar-img-input'
        let fileInput = document.querySelector('input#'+id+'[type=file]')
        if (fileInput == null) {
          fileInput = document.createElement('input')
          fileInput.id = id
          fileInput.setAttribute('type', 'file')
          fileInput.setAttribute('accept', this.mimes)
          fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
              let reader = new FileReader()
              reader.onload = (e) => {
                this.dataUrl = e.target.result
              }
              reader.readAsDataURL(fileInput.files[0])
            }
          })
        }
        fileInput.click()
      },
      createCropper() {
        let image = document.querySelector('.avatar-cropper-image-container img')
        this.cropper = new Cropper(image, {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 1,
          movable: false,
          zoomable: false,
        })
      },
      uploadImage(callback) {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          let data = new FormData()
          data.append(this.uploadFormName, blob)

          var xhr = new XMLHttpRequest()
          xhr.open('POST', this.uploadUrl, true)

          for (let header in this.uploadHeaders) {
            xhr.setRequestHeader(header, this.uploadHeaders[header])
          }

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              var response = JSON.parse(xhr.responseText)
              if (xhr.status === 200) {
                callback(response);
              } else {
                throw new Error('Image upload fail.', xhr)
              }
            }
          }
          xhr.send(data);
        })
      }
    },
    mounted() {
      let delegate = typeof this.delegate == 'object' ? this.delegate : document.querySelector(this.delegate)
      if (!delegate) {
        throw new Error('No avatar make delegate found.')
      }
      delegate.addEventListener('click', this.pickImage)
    }
  }
</script>

<style lang="scss">
  .avatar-cropper {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 99999;

    .avatar-cropper-close {
      float: right;
      padding: 20px;
      font-size: 3rem;
      color: #fff;
      font-weight: 100;
      text-shadow: 0px 1px rgba(40, 40, 40,.3);
    }

    .avatar-cropper-mark {
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background: rgba(0, 0, 0, .10);
    }
    .avatar-cropper-container {
      background: #fff;
      z-index: 999;
      box-shadow: 1px 1px 5px rgba(100, 100, 100, .14);

      .avatar-cropper-image-container {
        position: relative;
        max-width: 400px;
        height: 300px;
      }
      img {
        max-width: 100%;
        height: 100%;
      }

      .avatar-cropper-footer {
        display: flex;
        align-items: stretch;
        align-content: stretch;
        justify-content: space-between;

        .avatar-cropper-btn {
          width: 50%;
          padding: 15px 0;
          cursor: pointer;
          border: none;
          background: transparent;
          &:hover {
            background-color: #2aabd2;
            color: #fff;
          }
        }
      }
    }
  }
</style>
