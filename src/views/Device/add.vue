<template>
  <div>
    <cu-input label="id" v-model="submitmodel.device.id" placeholder="输入" v-if="false">
    </cu-input>
    <cu-input label="设备编号" v-model="submitmodel.device.deviceNo" placeholder="输入" >
    </cu-input>
    <cu-input label="设备描述" v-model="submitmodel.device.deviceName" placeholder="输入" >
    </cu-input>
    <cu-input label="设备尺寸(长)" v-model="submitmodel.device.deviceLength" placeholder="输入" >
    </cu-input>
    <cu-input label="设备尺寸(宽)" v-model="submitmodel.device.deviceWidth" placeholder="输入" >
    </cu-input>
    <cu-input label="设备品牌" v-model="submitmodel.device.deviceBrand" placeholder="输入" >
    </cu-input>
    <cu-input label="设备型号" v-model="submitmodel.device.deviceModel" placeholder="输入" >
    </cu-input>
    <cu-picker :pickerData="deviceSelectListData.deviceList" @select="deviceSelect" @cancel="deviceCancel" :alias="deviceAlias"
    :initialSelect="{val:submitmodel.device.type,Text:submitmodel.device.typeName}"
    >
        <div slot="label">
          设备类型
        </div>
      </cu-picker>
    <cu-picker :pickerData="deviceSelectListData.pmPgList" @select="pmPgSelect" @cancel="pmPgCancel" :alias="pmpgAlias"
    :initialSelect="{val:submitmodel.device.pgId,Text:submitmodel.device.pgName}"
    >
      <div slot="label">
        隶属部门
      </div>
    </cu-picker>
    <cu-picker :pickerData="deviceSelectListData.userList" @select="managerSelect" @cancel="managerCancel" :alias="managerAlias"
    :initialSelect="{val:submitmodel.device.managerId,Text:submitmodel.device.managerName}"
    >
      <div slot="label">
        点检负责人
      </div>
    </cu-picker>
    <cu-input label="购买日期" v-model="submitmodel.device.buyDate" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="deviceImgsSuccess"
    @file-remove="deviceImgsRemove"
    :initialFile="submitmodel.deviceImgList"
    :max='1'>
    <div slot="label">设备照片</div>
    </cu-upload>
    <cu-upload
    @file-success="deviceParamImgSuccess"
    @file-remove="deviceParamImgRemove"
    :initialFile="submitmodel.deviceParamImgList"
    :max='1'>
    <div slot="label">设备参数</div>
    </cu-upload>
    <cu-input label="参数备注" v-model="submitmodel.device.deviceParam" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="deviceServiceImgSuccess"
    @file-remove="deviceServiceImgRemove"
    :initialFile="submitmodel.deviceServiceImgList"
    :max='1'>
    <div slot="label">售后服务联系人</div>
    </cu-upload>
    <cu-input label="备注" v-model="submitmodel.device.remark" placeholder="输入">
    </cu-input>
    <!-- <cu-input label="售后服务信息" v-model="submitmodel.userInfo.permanentAddress" placeholder="输入" >
    </cu-input> -->
    <div class="group-title">
        <div>售后服务信息</div>
        <div class="group-sub-title">联系人</div>
    </div>
    <div v-for="(val, key) in submitmodel.deviceServiceList">
      <div class="group-item-title">
        <div></div>
        <div @click="deleteList(submitmodel.deviceServiceList,key)">删除</div>
      </div>
      <div v-for="(item,index) in fields.deviceServiceListField">
        <cu-input :label="item.label" v-model="submitmodel.deviceServiceList[key][item.name]" placeholder="输入">
        </cu-input>
      </div>
    </div>
    <div class="append-btn" @click="addList(submitmodel.deviceServiceList)">添加联系人</div>
    <cube-button type="button" @click="submit">提交保存</cube-button>
  </div>
</template>

<script>
import CuInput from '@/components/input/input'
import CuUpload from '@/components/upload/Upload'
import CuPicker from '@/components/picker/Picker'
import { deviceSelectList, getDeviceInfo, addDeviceInfo } from '@/api/device/Device.js'
import { getUrlQueryString } from '@/utils/utils.js'
import { nationList } from '@/data/nations.js'
export default {
  data () {
    return {
      nationList: nationList,
      // 职位列表
      // positionList:[],
      deviceSelectListData: {
        deviceList: [],
        pmPgList: [],
        userList: [],
        industryAvg: ''
      },
      deviceAlias: {
        value: 'code',
        text: 'name'
      },
      pmpgAlias: {
        value: 'code',
        text: 'name'
      },
      managerAlias: {
        value: 'uid',
        text: 'workName'
      },
      fields: {
        deviceServiceListField: [
          { name: 'supName',
            label: '供应商',
            placeholder: '请输入'
          },
          { name: 'contactMan',
            label: '联系人',
            placeholder: '请输入'
          },
          { name: 'phone',
            label: '联系电话',
            placeholder: '请输入'
          }
        ]
      },
      familyListFields: [],
      educationListFields: [],
      // 待提交至后端的表单数据
      submitmodel: {
        device: {
          id: 0,
          type: '',
          typeName: '',
          deviceBrand: '',
          deviceModel: '',
          buyDate: '',
          pgId: '',
          pgName: '',
          managerId: '',
          managerName: '',
          remark: '',
          isShare: '',
          machineRate: '',
          deviceCost: '',
          // 设备服务备注
          serviceRemark: ''
        },
        deviceServiceList: [],
        deviceServiceImgList: [],
        deviceImgList: [],
        deviceParamImgList: []
        // deviceImgs: [],
        // deviceServiceImgs: []
      }
    }
  },
  methods: {
    deviceSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.device.type = selectedVal.join(',')
      this.submitmodel.device.typeName = selectedText.join(',')
    },
    deviceCancel () {

    },
    pmPgSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.device.pgId = selectedVal.join(',')
      this.submitmodel.device.pgName = selectedText.join(',')
    },
    pmPgCancel () {
    },

    managerSelect (selected, selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal)
      this.submitmodel.device.managerId = selectedVal.join(',')
      this.submitmodel.device.managerName = selectedText.join(',')
    },
    managerCancel () {
    },
    // 第一个参数为URL集合
    // 第二个参数 解密后的返回值，
    // 第三个参数：文件对象
    deviceImgsSuccess (res, file) {
      let old = this.submitmodel.deviceImgList
      this.submitmodel.deviceImgList = old.concat({ imgUrl: res[0] })
    },
    deviceImgsRemove (res, file) {
      // this.submitmodel.deviceImgList = []
    },
    deviceParamImgSuccess (res, file) {
      console.log(res)
      console.log(this.submitmodel.deviceParamImgList)
      this.submitmodel.deviceParamImgList = this.submitmodel.deviceParamImgList.concat({ imgUrl: res[0] })
    },
    deviceParamImgRemove (res, file) {
      // this.submitmodel.deviceParamImgList = []
    },
    deviceServiceImgSuccess (res, file) {
      this.submitmodel.deviceServiceImgList = this.submitmodel.deviceServiceImgList.concat({ imgUrl: res[0] })
    },
    deviceServiceImgRemove (res, file) {
      // this.submitmodel.deviceServiceImgList = []
    },
    // 增加子列表
    addList (target) {
      target.push({})
    },
    // 删除子列表
    deleteList (target, index) {
      target.splice(index, 1)
    },
    submit () {
      var self = this
      console.log(this.submitmodel)
      addDeviceInfo(this.submitmodel)
        .then(function (res) {
          if (res.data.code === '000000') {
            self.$createToast({
              time: 2000,
              txt: res.data.msg,
              type: 'correct'
            }).show()
          } else {
            self.$createToast({
              time: 2000,
              txt: res.data.msg,
              type: 'error'
            }).show()
          }
        }).catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    var self = this
    let fullPath = this.$router.currentRoute.fullPath
    console.log(this.$router.currentRoute)
    if (!sessionStorage.getItem('token')) {
      // localStorage.setItem('nextpage', fullPath)
      // localStorage.setItem('type', 0)
      // localStorage.setItem('invite_deviceid', getUrlQueryString('deviceid'))
      self.$router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else {
      this.submitmodel.device.id = parseInt(getUrlQueryString('deviceid'))
      deviceSelectList()
        .then(
          function (res) {
            let deviceSelectListData = res.data
            console.log(deviceSelectListData)
            self.deviceSelectListData = deviceSelectListData.data
          }
        ).catch(function (err) {
          console.log(err)
        })

      getDeviceInfo({ id: this.submitmodel.device.id })
        .then(
          function (res) {
            console.log(res.data)
            if (res.data.data) {
              Object.assign(self.submitmodel, res.data.data)
            }
            console.log(res)
            console.log(self.submitmodel)
          }
        ).catch(function (err) {
          console.log(err)
        })
    }
  },
  components: {
    CuInput,
    CuUpload,
    CuPicker
  }
}

</script>

<style scoped>
  .tips {
    font-size: 16px;
    line-height: 1.4;
    padding: 10px;
    text-indent: 2em;
  }
  .group-title{
    margin-left: 15px;
    font-size: 20px;
    border-left: #707FD8 2px solid;
    padding-left: 4px;
    padding-top: 15px;
    padding-bottom: 10px;
    background: #F7F8FE;
  }
  .group-sub-title{
    font-size: 10px;
    padding-top: 6px;
    color: #BFC2C7;
  }
  .group-item-title{
    display: flex;
    align-content: space-between;
    justify-content:space-between;
    padding: 10px 15px;
    font-size: 18px;
  }
  .append-btn{
    font-size: 16px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #407D94;
  }

  .constom-input {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
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

</style>
