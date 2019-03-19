<template>
  <div class="item constom-input border-bottom-1px">
    <div class="constom-input_label">
      <slot name="label"></slot>
    </div>
    <div class="upload-file-list">
      <div class="file-wrapper">
        <template v-for="(item,index) in importFiles">
          <div v-show="typeof(item)==='string'" class="initial-file">
            <div :style="{backgroundImage:'url('+item+')'}" class="initial-file-img"></div>
          </div>
          <div v-show="typeof(item)==='object'" class="initial-file">
            <div :style="{backgroundImage:'url('+item.imgUrl+')'}" class="initial-file-img"></div>
          </div>
        </template>
        <cube-upload ref="upload" :action="action" :simultaneous-uploads="1" :max='max' v-model="files" @files-added="addedHandler" @file-success="fileSuccess" @file-removed="fileRemoved">
          <div class="clear-fix">
            <!-- <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file> -->
            <cube-upload-btn :multiple="false">
              <div>
                <i>＋</i>
              </div>
            </cube-upload-btn>
          </div>
        </cube-upload>
      </div>
    </div>
  </div>
</template>
<script>
import { encryption, decrypt } from '@/utils/crypt'
import { WEBURL, BASEURL } from '@/utils/utils.js'
import md5 from 'md5'

const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')
console.log(md5String)
const req = {
  token: token,
  md5: md5String,
  timestamp: timestamp,
  data: {}
}
console.log(req)
const encryptionData = encryption(JSON.stringify(req))

export default {
  name: 'CuUpload',
  model: {
    value: ''
  },
  props: {
    initialFile: {
      type: [String, Array]
    },
    action: {
      type: Object,
      default () {
        return {
          target: WEBURL + '/img/h5ImgUpload',
          fileName: 'imgFile',
          data: { paramsMap: JSON.stringify(req) },
          checkSuccess: (res, file) => {
            // let rdata = JSON.parse(decrypt(res.resultData))
            console.log('res', res)
            if (res.status === 0) {
              // this.uploadValue1 = rdata.url
              return true
            }
          }
        }
      }
    },
    max: {
      type: Number,
      default: 10
    },
    'simultaneous-uploads': {
      type: Number,
      default: 1
    },
    value: [String, Number],
    placeholder: String
  },
  data () {
    // console.log(this.initialFile.split(','))
    return {
      // validity: {},
      // valid: undefined,
      // newValue: this.value
      files: '',
      isChange: false,
      importFiles: [],
      files: []
    }
  },
  watch: {
    initialFile: {
      handler: function (curSelect, oldSelect) {
        // console.log(this.importFiles)
        // console.log(curSelect, oldSelect)
        if (curSelect) {
          this.initialFile = curSelect
          this.select = this.initialFile
          // console.log(this.initialFile)
          if (Array.isArray(this.initialFile)) {
            this.importFiles = this.initialFile
          } else {
            this.importFiles = this.initialFile.split(',')
          }
          console.log(this.importFiles)
        }
      }
    }
  },
  computed: {
    // 文件上传后的URL地址
    fileURLs: function () {
      let arr = []
      for (let item of this.files) {
        let de = item.response
        console.log(de)
        if (de.status === 0) {
          arr.push(de.data.url)
        } else {
          console.log('文件上传失败')
        }
      };
      console.log(arr)
      return arr
    }
  },
  methods: {
    addedHandler () {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
      this.isChange = true
    },
    fileSuccess (e) {
      // console.log(this.fileURLs)
      this.$emit('file-success', this.fileURLs, JSON.parse(decrypt(e.response.resultData)), e)
      console.log(this.fileURLs)
    },
    fileRemoved (e) {
      // console.log(this.fileURLs)
      // 第一个参数为URL集合
      // 第二个参数 解密后的返回值，
      // 第三个参数：文件对象
      this.$emit('file-remove', this.fileURLs, JSON.parse(decrypt(e.response.resultData)), e)
    }
  }
}

</script>

<style scoped>
  .upload-file-list {
    position: relative;
    height: 80px;
    /* width: 400px; */
    flex: 1;
  }

  .file-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    overflow-x: auto;
  }

  .initial-file-img {
    width: 80px;
    height: 80px;
    position: relative;
    box-sizing: border-box;
    background: #fff no-repeat center;
    background-size: cover;
    border-radius: 0.053333rem;
  }

  .constom-input {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
  }

  .constom-input_label {
    font-size: 16px;
    width: 100px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
  }

  .constom-input_content {
    flex: 1
  }

  .cube-input::after {
    display: none
  }

  .item {
    display: flex;
    align-items: center;
  }

  .cube-upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cube-upload-btn>div {
    text-align: center;
  }

  .cube-upload-btn i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    font-size: 32px;
    line-height: 1;
    font-style: normal;
    color: #333;
    /* background-color: #333; */
    border-radius: 50%;
  }

  .cube-upload .cube-upload-btn,
  .cube-upload .cube-upload-file {
    margin: 0;
    height: 80px;
  }

  .cube-upload .cube-upload-file+.cube-upload-btn {
    margin-top: -80px;
    opacity: 0;
  }

</style>
