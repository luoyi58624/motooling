<template>
  <div>
    <div class="tips">
      欢迎贵司成为我司的供应商！ 请如实填写以下信息，以便贵司顺利加入我司的供应商行列。
    </div>
    <div class="group-title">
      <div>基本信息</div>
    </div>
    <div class="hidden">
      <cu-input label="code" v-model="submitmodel.code" placeholder="输入">
      </cu-input>
      <cu-input label="id" v-model="submitmodel.supplierMap.id" placeholder="输入">
      </cu-input>
      <cu-input label="supCompanyId" v-model="submitmodel.supplierMap.supCompanyId" placeholder="输入">
      </cu-input>
    </div>
    <cu-input label="公司全称" v-model="submitmodel.supplierMap.companyFullName" placeholder="输入">
    </cu-input>
    <cu-input label="公司地址" v-model="submitmodel.supplierMap.supCompanyAddress" placeholder="输入">
    </cu-input>
    <cu-input label="公司电话" v-model="submitmodel.supplierMap.phone" placeholder="输入">
    </cu-input>
    <cu-input label="公司传真" v-model="submitmodel.supplierMap.fax" placeholder="输入">
    </cu-input>
    <cu-input label="公司网址" v-model="submitmodel.supplierMap.website" placeholder="输入">
    </cu-input>

    <div class="group-title">
      <div>联系人信息</div>
    </div>
    <div v-for="(val, key) in submitmodel.supplierContactorList" :key='key'>
      <div class="group-item-title">
        <div></div>
        <!-- <div @click="deleteList(submitmodel.supplierContactorList,key)">删除</div> -->
      </div>
      <div v-for="item in fields.supplierContactorListField" :key="item.label">
        <cu-input :label="item.label" v-model="submitmodel.supplierContactorList[key][item.name]" placeholder="输入">
        </cu-input>
      </div>
    </div>
    <div class="append-btn" @click="addList(submitmodel.supplierContactorList)">添加联系人</div>
    <div class="group-title">
      <div>结算信息</div>
    </div>
    <cu-picker :pickerData="supplierSelectListData.coinType"
      @select="coinTypeSelect"
      @cancel="coinTypeCancel"
      :alias="coinTypeAlias"
      :initialSelect="{val:submitmodel.supplierMap.coin,Text:submitmodel.supplierMap.coinName}"
      >
      <div slot="label">
        结算币种
      </div>
    </cu-picker>
    <cu-picker :pickerData="supplierSelectListData.payType"
      @select="payTypeSelect"
      @cancel="payTypeCancel"
      :alias="payTypeAlias"
      :initialSelect="{val:submitmodel.supplierMap.settlementCode,Text:submitmodel.supplierMap.settlement}"
      >
      <div slot="label">
        结算方式
      </div>
    </cu-picker>
    <cu-picker
      :pickerData="supplierSelectListData.invoiceType"
      @select="invoiceTypeSelect"
      @cancel="invoiceTypeCancel"
      :alias="invoiceTypeAlias"
      :initialSelect="{val:submitmodel.supplierMap.invoiceType,Text:submitmodel.supplierMap.invoiceTypeName}"
      >
      <div slot="label">
        发票类型
      </div>
    </cu-picker>
    <cu-picker :pickerData="supplierSelectListData.taxRatio"
      @select="taxRatioSelect"
      @cancel="taxRatioCancel"
      :alias="taxRatioAlias"
      :initialSelect="{val:submitmodel.supplierMap.taxRatio,Text:submitmodel.supplierMap.taxRatio}"
      >
      <div slot="label">
        税率
      </div>
    </cu-picker>
    <cu-picker :pickerData="supplierSelectListData.paymentType"
      @select="paymentTypeSelect"
      @cancel="paymentTypeCancel"
      :alias="paymentTypeAlias"
      :initialSelect="{val:submitmodel.supplierMap.paymentCode,Text:submitmodel.supplierMap.payment}"
      >
      <div slot="label">
        付款方式
      </div>
    </cu-picker>
    <cu-input label="税务账号" v-model="submitmodel.supplierMap.taxAccount" placeholder="输入">
    </cu-input>
    <cu-input label="开户银行" v-model="submitmodel.supplierMap.bank" placeholder="输入">
    </cu-input>
    <cu-input label="银行账号" v-model="submitmodel.supplierMap.bankAccount" placeholder="输入">
    </cu-input>
    <div class="group-title">
      <div>证件资料</div>
    </div>
    <cu-upload @file-success="licenseOriginalSuccess" @file-remove="licenseOriginalRemove" :max='1' :initialFile="submitmodel.licenseOriginal">
      <div slot="label">营业执照原件</div>
    </cu-upload>
    <cu-upload @file-success="systemOriginalSuccess" @file-remove="systemOriginalRemove" :max='1' :initialFile="submitmodel.systemOriginal">
      <div slot="label">体系证书原件</div>
    </cu-upload>
    <cu-upload @file-success="otherOriginalSuccess" @file-remove="otherOriginalRemove" :max='1' :initialFile="submitmodel.otherOriginal">
      <div slot="label">其它证书原件</div>
    </cu-upload>
    <!-- <div class="group-title">
      <div>供应商类型</div>
    </div> -->
    <!-- <div v-for="(val, key) in submitmodel.deviceServiceList">
      <div class="group-item-title">
        <div></div>
        <div @click="deleteList(submitmodel.deviceServiceList,key)">删除</div>
      </div>
      <div v-for="(item,index) in fields.supplierContactorListField">
        <cu-input :label="item.label" v-model="submitmodel.deviceServiceList[key][item.name]" placeholder="输入">
        </cu-input>
      </div>
    </div> -->
    <cube-button type="button" @click="submit">提交保存</cube-button>
  </div>
</template>

<script>
import CuInput from '@/components/input/input'
import CuUpload from '@/components/upload/Upload'
import CuPicker from '@/components/picker/Picker'
import { getSupplierInfo, addSupplierInfo, supplierSelectList } from '@/api/supplier/Supplier.js'
import { getUrlQueryString } from '@/utils/utils.js'
export default {
  data () {
    return {
      // 职位列表
      // positionList:[],
      supplierSelectListData: {
        coinType: [],
        payType: [],
        invoiceType: [],
        taxRatio: [],
        paymentType: []
      },
      coinTypeAlias: {
        value: 'code',
        text: 'name'
      },
      payTypeAlias: {
        value: 'code',
        text: 'name'
      },
      paymentTypeAlias: {
        value: 'code',
        text: 'name'
      },
      invoiceTypeAlias: {
        value: 'code',
        text: 'name'
      },
      taxRatioAlias: {
        value: 'remark',
        text: 'remark'
      },
      fields: {
        supplierContactorListField: [{
          name: 'contactMan',
          label: '姓名',
          placeholder: '请输入'
        },
        {
          name: 'phone',
          label: '联系电话',
          placeholder: '请输入'
        },
        {
          name: 'fax',
          label: '传真',
          placeholder: '请输入'
        },
        {
          name: 'email',
          label: 'E-mail',
          placeholder: '请输入'
        },
        {
          name: 'positionName',
          label: '职位',
          placeholder: '请输入'
        }
        ]
      },
      familyListFields: [],
      educationListFields: [],
      // 待提交至后端的表单数据
      submitmodel: {
        code: '',
        supplierMap: {
          supCompanyId: '',
          companyFullName: '',
          supCompanyAddress: '',
          phone: '',
          fax: '',
          website: '',
          invoiceType: '',
          invoiceTypeName: '',
          coin: '',
          coinName: '',
          taxRatio: '',
          settlementCode: '',
          settlement: '',
          paymentCode: '',
          payment: '',
          matTypeIds: '',
          matTypeNames: '',
          taxAccount: '',
          bank: '',
          bankAccount: '',
          id: 0
        },
        supplierContactorList: [],
        licenseOriginal: [],
        systemOriginal: [],
        otherOriginal: []
      }
    }
  },
  methods: {
    coinTypeSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.supplierMap.coin = selectedVal.join(',')
      this.submitmodel.supplierMap.coinName = selectedText.join(',')
    },
    coinTypeCancel () {},
    payTypeSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.supplierMap.settlementCode = selectedVal.join(',')
      this.submitmodel.supplierMap.settlement = selectedText.join(',')
    },
    payTypeCancel () {},
    invoiceTypeSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.supplierMap.invoiceType = selectedVal.join(',')
      this.submitmodel.supplierMap.invoiceTypeName = selectedText.join(',')
    },
    invoiceTypeCancel () {},
    taxRatioSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.supplierMap.taxRatio = selectedVal.join(',')
      // this.submitmodel.supplierMap.invoiceTypeName = selectedVal.join(',')
    },
    taxRatioCancel () {},
    paymentTypeSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.supplierMap.paymentCode = selectedVal.join(',')
      this.submitmodel.supplierMap.payment = selectedText.join(',')
    },
    paymentTypeCancel () {

    },
    // 第一个参数为URL集合
    // 第二个参数 解密后的返回值，
    // 第三个参数：文件对象
    licenseOriginalSuccess (res, encryptRes, file) {
      console.log(res)
      console.log(encryptRes)
      console.log(file)
      this.submitmodel.licenseOriginal = this.submitmodel.licenseOriginal.concat({ imgUrl: res[0] })
    },
    licenseOriginalRemove (res, file) {
      this.submitmodel.licenseOriginal = []
    },
    systemOriginalSuccess (res, file) {
      this.submitmodel.systemOriginal = this.submitmodel.systemOriginal.concat({ imgUrl: res[0] })
    },
    systemOriginalRemove (res, file) {
      this.submitmodel.systemOriginal = []
    },
    otherOriginalSuccess (res, file) {
      this.submitmodel.otherOriginal = this.submitmodel.otherOriginal.concat({ imgUrl: res[0] })
    },
    otherOriginalRemove (res, file) {
      this.submitmodel.otherOriginal = []
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
      console.log(JSON.stringify(this.submitmodel))
      addSupplierInfo(this.submitmodel)
        .then(function (res) {
          console.log(res)
          if (res.data.code === '000000') {
            self.$createToast({
              time: 2000,
              txt: res.data.msg,
              type: 'correct'
            }).show()
            // self.$router.replace('/')
          } else {
            self.$createToast({
              time: 2000,
              txt: '添加失败: ' + res.data.msg,
              type: 'error'
            }).show()
            alert('' + res.data.msg)
          }
        }).catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    let self = this
    let fullPath = this.$router.currentRoute.fullPath
    console.log(this.$router.currentRoute)
    if (!sessionStorage.getItem('token')) {
      // localStorage.setItem('nextpage', fullPath)
      // localStorage.setItem('type', 0)
      // localStorage.setItem('invite_code', getUrlQueryString('code'))
      // localStorage.setItem('invite_companyid', getUrlQueryString('companyid'))
      // self.$router.replace('/login?next=' + fullPath)
      self.$router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else {
      this.submitmodel.code = decodeURIComponent(getUrlQueryString('code'))
      supplierSelectList()
        .then(
          function (res) {
            console.log(res.data)
            if (res.data.code === '000000') {
              let supplierSelectListData = res.data.data
              console.log(supplierSelectListData)
              self.supplierSelectListData = supplierSelectListData
            } else {
              self.$createToast({
                time: 2000,
                txt: res.data.msg,
                type: 'error'
              }).show()
            }
          }
        ).catch(function (err) {
          console.log(err)
        })

      getSupplierInfo({ code: this.submitmodel.code })
        .then(
          function (res) {
            console.log(res.data)
            if (res.data.code === '000000' && res.data.data) {
              Object.assign(self.submitmodel, res.data.data)
            } else {
              self.$createToast({
                time: 2000,
                txt: res.data.msg,
                type: 'error'
              }).show()
            }
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

  .group-title {
    margin-left: 15px;
    font-size: 20px;
    border-left: #707FD8 2px solid;
    padding-left: 4px;
    padding-top: 15px;
    padding-bottom: 10px;
    background: #F7F8FE;
  }

  .group-sub-title {
    font-size: 10px;
    padding-top: 6px;
    color: #BFC2C7;
  }

  .group-item-title {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 18px;
  }

  .append-btn {
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
