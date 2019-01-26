<template>
    <div class="item constom-input border-bottom-1px">
        <div class="constom-input_label">
            <slot name="label"></slot>
        </div>
       <cube-upload
       :action="action"
       :simultaneous-uploads="1"
       :max='max'
       v-model="files"
       @file-success="fileSuccess"
       @file-removed="fileRemoved"
       />
    </div>
   </template>
<script>
import { encryption, decrypt } from '@/utils/crypt'
import md5 from 'md5'

const token = ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')
console.log(md5String)
const req = {
  token: token,
  md5: md5String,
  timestamp: timestamp,
  data: {}
}
const encryptionData = encryption(JSON.stringify(req))

export default {
  name: 'CuUpload',
  model: {
    value: ''
  },
  props: {
    action: {
      type: Object,
      default () {
        return {
          target: '/img/uploadImg',
          fileName: 'imgFile',
          data: {
            paramsData: encryptionData
          },
          checkSuccess: (res, file) => {
            console.log('res', res)
            let rdata = JSON.parse(decrypt(res.resultData))
            if (rdata.status === 0) {
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
    return {
      // validity: {},
      // valid: undefined,
      // newValue: this.value
      files: []
    }
  },
  computed: {
    // 文件上传后的URL地址
    fileURLs: function () {
      let arr = []
      for (let item of this.files) {
        let de = JSON.parse(decrypt(item.response.resultData))
        if (de.status === 0) {
          arr.push(de.data.url)
        } else {
          console.log('文件上传失败')
        }
      }
      return arr
    }
  },
  methods: {
    fileSuccess (e) {
      // console.log(this.fileURLs)
      this.$emit('file-success', this.fileURLs, JSON.parse(decrypt(e.response.resultData)), e)
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

.constom-input{
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top:10px;
}
.constom-input_label{
  font-size: 16px;
  width: 100px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  word-break: break-word;
}
.constom-input_content{
  flex: 1
}
.cube-input::after{
  display: none
}
.item{
  display: flex;
  align-items: center;
}
</style>
