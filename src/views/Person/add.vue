<template>
  <div>
    <div class="tips">
      欢迎您加入MoTooling! 请如实填写以下信息，以便您使用简单、快捷的办公方式
    </div>
    <!-- 免冠照 -->
    <cu-upload
    @file-success="avatarSuccess"
    @file-remove="avatarRemove"
    :initialFile="submitmodel.userInfo.avatar"
    :max='1'>
    <div slot="label">
      免冠照片
    </div>
    </cu-upload>
    <cu-picker :pickerData="depList" @select="depSelect" @cancel="depCancel"
    :alias="depAlias"
    :initialSelect="{val:submitmodel.userInfo.depId,Text:submitmodel.userInfo.depName}"
    :isRequired="true"
    >
      <div slot="label">
        隶属部门
      </div>
    </cu-picker>
    <cu-picker :pickerData="positionList" @select="positionSelect" @cancel="positionCancel"
    :alias="positionAlias"
    :initialSelect="{val:submitmodel.userInfo.positionCode,Text:submitmodel.userInfo.positionName}"
    :isRequired="true"
    >
      <div slot="label">
        职位
      </div>
    </cu-picker>
    <!-- <cu-input label="uid" v-model="submitmodel.userInfo.uid" placeholder="输入" >
    </cu-input> -->
    <!-- <cu-input label="referee" v-model="submitmodel.userInfo.referee" placeholder="输入" >
    </cu-input> -->
    <cu-input label="姓名" v-model="submitmodel.userInfo.username" :isRequired="true" placeholder="输入" >
    </cu-input>
    <cu-picker :pickerData="genderList" @select="genderSelect" @cancel="genderCancel"
    :initialSelect="{val:submitmodel.userInfo.gender,Text:genderText(submitmodel.userInfo.gender)}"
    :isRequired="true"
    >
      <div slot="label">
        性别
      </div>
    </cu-picker>
    <cu-input label="工作姓名" v-model="submitmodel.userCompanyInfo.workName" placeholder="输入" >
    </cu-input>
    <cu-input label="工薪等级" v-model="submitmodel.userCompanyInfo.wagesLevel" placeholder="由财务人员填写" disabled>
    </cu-input>
    <!-- <cu-input label="" v-model="submitmodel.userCompanyInfo.nation" placeholder="输入" >
    </cu-input> -->
    <cu-picker :pickerData="nationList" @select="nationSelect" @cancel="nationCancel"
    :initialSelect="{val:submitmodel.userCompanyInfo.nation,Text:submitmodel.userCompanyInfo.nation}"
    >
      <div slot="label">
        民族
      </div>
    </cu-picker>
    <cu-input label="籍贯" v-model="submitmodel.userCompanyInfo.nativePlace" placeholder="输入" >
    </cu-input>
    <cu-input label="户籍地址" v-model="submitmodel.userCompanyInfo.permanentAddress" placeholder="输入" >
    </cu-input>
    <cu-input label="现居地址" v-model="submitmodel.userInfo.address" placeholder="输入" >
    </cu-input>
    <cu-picker :pickerData="marriedList" @select="marriedSelect" @cancel="marriedCancel"
    :initialSelect="{val:submitmodel.userCompanyInfo.isMarried,Text:marriedText(submitmodel.userCompanyInfo.isMarried)}"
    >
      <div slot="label">
        是否已婚
      </div>
    </cu-picker>
    <cu-input label="政治面貌" v-model="submitmodel.userCompanyInfo.politicalOutlook" placeholder="输入" >
    </cu-input>
    <cu-input label="联系电话" v-model="submitmodel.userInfo.mobile" :isRequired="true" placeholder="输入" :disabled="true">
    </cu-input>
    <cu-input label="员工卡号" v-model="submitmodel.userCompanyInfo.cardId" placeholder="输入" >
    </cu-input>
    <div class="constom-input border-bottom-1px">
      <div class="constom-input_label">入职日期</div>
      <div class="constom-input_content" @click="showWorkStartPicker">
        <div class="cube-input">
          <div class="cube-input-field">
            {{submitmodel.userCompanyInfo.workStart?submitmodel.userCompanyInfo.workStart:'请选择'}}
          </div>
        </div>
      </div>
    </div>
    <div class="constom-input border-bottom-1px">
      <div class="constom-input_label">出生日期</div>
      <div class="constom-input_content" @click="showBirthdayDatePicker">
        <div class="cube-input">
          <div class="cube-input-field">
            {{submitmodel.userInfo.birthday?submitmodel.userInfo.birthday:'请选择'}}
          </div>
        </div>
      </div>
    </div>
    <cu-input label="身份证号" v-model="submitmodel.userInfo.idNo" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="idCardcertificatesFaceImgSuccess"
    @file-remove="idCardcertificatesFaceImgRemove"
    :initialFile="submitmodel.idCard.certificatesFaceImg"
    :max='1'>
    <div slot="label">身份证正面照</div>
    </cu-upload>
    <cu-upload
    @file-success="idCardcertificatesBackImgSuccess"
    @file-remove="idCardcertificatesBackImgRemove"
    :initialFile="submitmodel.idCard.certificatesBackImg"
    :max='1'>
    <div slot="label">身份证反面照</div>
    </cu-upload>
    <cu-input label="社保卡号" v-model="submitmodel.socialSecurity.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="socialSecuritycertificatesFaceImgSuccess"
    @file-remove="socialSecuritycertificatesFaceImgRemove"
    :initialFile="submitmodel.socialSecurity.certificatesFaceImg"
    :max='1'>
    <div slot="label">社保卡原件照</div>
    </cu-upload>

    <cu-input label="公积金号" v-model="submitmodel.accumulation.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="accumulationcertificatesFaceImgSuccess"
    @file-remove="accumulationcertificatesFaceImgRemove"
    :initialFile="submitmodel.accumulation.certificatesFaceImg"
    :max='1'>
    <div slot="label">公积金卡原件照</div>
    </cu-upload>
    <cu-input label="工资卡号" v-model="submitmodel.salary.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="salarycertificatesFaceImgSuccess"
    @file-remove="salarycertificatesFaceImgRemove"
    :initialFile="submitmodel.salary.certificatesFaceImg"
    :max='1'>
    <div slot="label">工资卡原件照</div>
    </cu-upload>
    <div>
      <div class="group-title">家庭成员</div>
        <div v-for="(val, key) in submitmodel.familyList">
          <div class="group-item-title">
            <div>家庭成员 {{key+1}}</div>
            <div @click="deleteList(submitmodel.familyList,key)">删除</div>
          </div>
          <div v-for="(item,index) in fields.familyListField">
            <cu-input :label="item.label" v-model="submitmodel.familyList[key][item.name]" placeholder="输入">
            </cu-input>
          </div>
        </div>
        <div class="append-btn" @click="addList(submitmodel.familyList)">添加家庭成员</div>
    </div>
    <div>
      <div class="group-title">
        <div>遇事紧急联系人</div>
        <div class="group-sub-title">所在城市紧急联系人</div>
      </div>
        <div v-for="(val, key) in submitmodel.urgentContactsList">
          <div class="group-item-title">
            <div>紧急联系人{{key+1}}</div>
            <div @click="deleteList(submitmodel.urgentContactsList,key)">删除</div>
          </div>
          <div v-for="(item,index) in fields.urgentContactsListField">
            <cu-input :label="item.label" v-model="submitmodel.urgentContactsList[key][item.name]" placeholder="输入">
            </cu-input>
          </div>
        </div>
      <div class="append-btn" @click="addList(submitmodel.urgentContactsList)">添加遇事紧急联系人</div>
    </div>
    <div>
      <div class="group-title">
        <div>学历</div>
        <div class="group-sub-title">从最高学历填起</div>
      </div>
      <div v-for="(val, key) in submitmodel.educationList">
          <div class="group-item-title">
            <div>学历 {{key+1}}</div>
            <div><div @click="deleteList(submitmodel.educationList,key)">删除</div></div>
          </div>
        <div v-for="(item,index) in fields.educationListField">
          <cu-input :label="item.label" v-model="submitmodel.educationList[key][item.name]" placeholder="输入">
          </cu-input>
        </div>
        <cu-upload
        @file-success="educationList_coverImg_success(key,...arguments)"
        @file-remove="educationList_coverImg_remove(key,...arguments)"
        :initialFile="submitmodel.educationList[key].coverImg"
        :max='1'>
        <div slot="label">证件封面</div>
        </cu-upload>
        <cu-upload
        @file-success="educationList_credentialNoImg_success(key,...arguments)"
        @file-remove="educationList_credentialNoImg_remove(key,...arguments )"
        :initialFile="submitmodel.educationList[key].credentialNoImg"
        :max='1'>
        <div slot="label">证件号页</div>
        </cu-upload>
      </div>
      <div class="append-btn" @click="addList(submitmodel.educationList)">添加学历</div>
    </div>
    <div>
    <div class="group-title">
        <div>工作经历</div>
        <div class="group-sub-title">从最近工作经历填起</div>
    </div>
    <div v-for="(val, key) in submitmodel.userWorkList">
      <div class="group-item-title">
        <div>工作经历 {{key+1}}</div>
        <div @click="deleteList(submitmodel.userWorkList,key)">删除</div>
      </div>
      <div v-for="(item,index) in fields.userWorkListField">
        <cu-input :label="item.label" v-model="submitmodel.userWorkList[key][item.name]" placeholder="输入">
        </cu-input>
      </div>
    </div>
      <div class="append-btn" @click="addList(submitmodel.userWorkList)">添加工作经历</div>
      </div>
    <cube-button type="button" @click="submit">提交保存</cube-button>
  </div>
</template>

<script>
import CuInput from '@/components/input/input'
import CuUpload from '@/components/upload/Upload'
import CuPicker from '@/components/picker/Picker'
import { addUser, getUser, userSelectList } from '@/api/Person/User.js'
import { getUrlQueryString } from '@/utils/utils.js'
import { nationList } from '@/data/nations.js'
export default {
  data () {
    return {
      // test: 'testvalue',
      input: 123,
      value: '',
      nationList: nationList,
      // 职位列表
      // positionList:[],
      positionList: [],
      depAlias: {
        value: 'depId',
        text: 'depName'
      },
      positionAlias: {
        value: 'code',
        text: 'name'
      },
      // 部门列表
      depList: [],

      marriedList: [
        { text: '未婚', value: false },
        { text: '已婚', value: true }
      ],
      genderList: [
        { text: '未定', value: 0 },
        { text: '男', value: 1 },
        { text: '女', value: 2 }
      ],
      fields: {
        familyListField: [
          {
            name: 'name',
            label: '姓名',
            placeholder: '输入'
          },
          {
            name: 'relation',
            label: '关系',
            placeholder: '输入',
            value: ''
          },
          {
            name: 'phone',
            label: '联系方式',
            placeholder: '输入',
            value: ''
          },
          { name: 'workUnit',
            label: '工作单位',
            placeholder: '输入',
            value: ''
          },
          {
            name: 'currentAddress',
            label: '现居地址',
            placeholder: '输入',
            value: ''
          }
        ],
        educationListField: [
          { name: 'education',
            label: '学历',
            placeholder: '输入',
            value: '132'
          },
          {
            name: 'graduationSchool',
            label: '毕业学校',
            placeholder: '输入',
            value: '333'
          },
          {
            name: 'major',
            label: '专业',
            placeholder: '输入',
            value: ''
          },
          { name: 'graduationTime',
            label: '毕业时间',
            placeholder: '输入',
            value: ''
          }
        ],
        urgentContactsListField: [
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'relation',
            label: '关系',
            placeholder: '输入'
          },
          {
            name: 'phone',
            label: '联系电话',
            placeholder: '输入'
          },
          {
            name: 'workUnit',
            label: '工作单位',
            placeholder: '输入'
          },
          {
            name: 'currentAddress',
            label: '现居地址',
            placeholder: '输入'
          }
        ],
        userWorkListField: [
          { name: 'workUnit',
            label: '工作单位',
            placeholder: '输入'
          },
          { name: 'dutiesMax',
            label: '最高职务',
            placeholder: '输入'
          },
          { name: 'inaugurationTime',
            label: '就职时间',
            placeholder: '输入'
          },
          { name: 'quitTime',
            label: '离职时间',
            placeholder: '输入'
          },
          { name: 'quitReason',
            label: '离职原因',
            placeholder: '输入'
          },
          { name: 'witness',
            label: '证明人',
            placeholder: '输入'
          },
          { name: 'witnessPhone',
            label: '证明人电话',
            placeholder: '输入'
          },
          { name: 'workAddress',
            label: '工作地址',
            placeholder: '输入'
          }
        ]
      },
      familyListFields: [],
      educationListFields: [],
      // 待提交至后端的表单数据
      submitmodel: {
        // phoneCode: '',
        // mobile: '',
        userInfo: {
          referee: 0,
          uid: 0,
          username: '',
          mobile: '',
          avatar: '',
          depId: '',
          depName: '',
          positionName: '',
          positionCode: '',
          gender: 0
        },
        idCard: {
        },
        userCompanyInfo: {
          workName: ''
        },
        familyList: [],
        educationList: [],
        urgentContactsList: [],
        userWorkList: [],
        socialSecurity: {},
        accumulation: {},
        salary: {}

      }
    }
  },
  methods: {
    genderText (val) {
      if (val == 1) {
        return '男'
      } else if (val == 2) {
        return '女'
      } else if (val == 0) {
        return '未定'
      } else {
        return '请选择'
      }
    },
    marriedText (val) {
      if (val == false) {
        return '未婚'
      } else if (val == true) {
        return '已婚'
      } else {
        return '请选择'
      }
    },
    // 出生日期选择
    showBirthdayDatePicker () {
      if (!this.birthdayDatePicker) {
        this.birthdayDatePicker = this.$createDatePicker({
          title: '出生日期',
          min: new Date(1900, 1, 1),
          max: new Date(),
          value: new Date(this.submitmodel.userInfo.birthday?this.submitmodel.userInfo.birthday:Date.now()),
          onSelect: this.selectBirthdayDateHandle,
          onCancel: this.cancelBirthdayDateHandle
        })
      }
      this.birthdayDatePicker.show()
    },
    selectBirthdayDateHandle (date, selectedVal, selectedText) {
      this.$set(this.submitmodel.userInfo, 'birthday', selectedVal.join('-'))
    },
    cancelBirthdayDateHandle () {
    },
    // 入职日期选择
    showWorkStartPicker () {
      if (!this.workStartPicker) {
        this.workStartPicker = this.$createDatePicker({
          title: '入职日期',
          min: new Date(1900, 1, 1),
          max: new Date(),
          value: new Date(this.submitmodel.userCompanyInfo.workStart?this.submitmodel.userCompanyInfo.workStart:Date.now()),
          onSelect: this.selectWorkStartHandle,
          onCancel: this.cancelWorkStartHandle
        })
      }
      this.workStartPicker.show()
    },
    selectWorkStartHandle (date, selectedVal, selectedText) {
      this.$set(this.submitmodel.userCompanyInfo, 'workStart', selectedVal.join('-'))
    },
    cancelWorkStartHandle () {
    },
    positionSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userInfo.positionCode = selectedVal[0]
      this.submitmodel.userInfo.positionName = selectedText[0]
    },
    positionCancel () {
      console.log('cancel')
    },
    depSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userInfo.depId = selectedVal[0]
      this.submitmodel.userInfo.depName = selectedText[0]
    },
    depCancel () {

    },
    nationSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userCompanyInfo.nation = selectedVal[0]
    },
    nationCancel () {
      // this.submitmodel.userCompanyInfo.nation = ''
    },
    marriedSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userCompanyInfo.married = selectedVal[0]
    },
    marriedCancel () {},
    genderSelect (selected, selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userInfo.gender = selectedVal[0]
    },
    genderCancel () {
      // this.submitmodel.userInfo.gender = ''
    },
    // 第一个参数为URL集合
    // 第二个参数 解密后的返回值，
    // 第三个参数：文件对象

    avatarSuccess (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    avatarRemove (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    // idCard: {
    idCardcertificatesFaceImgSuccess (res, file) {
      this.$set(this.submitmodel.idCard, 'certificatesFaceImg', res.toString())
    },
    idCardcertificatesFaceImgRemove (res, file) {
      this.submitmodel.idCard.certificatesFaceImg = ''
    },
    idCardcertificatesBackImgSuccess (res, file) {
      this.$set(this.submitmodel.idCard, 'certificatesBackImg', res.toString())
    },
    idCardcertificatesBackImgRemove (res, file) {
      this.submitmodel.idCard.certificatesBackImg = ''
    },
    // 社保卡
    socialSecuritycertificatesFaceImgSuccess (res, file) {
      this.$set(this.submitmodel.socialSecurity, 'certificatesFaceImg', res.toString())
    },
    socialSecuritycertificatesFaceImgRemove (res, file) {
      this.submitmodel.socialSecurity.certificatesFaceImg = ''
    },
    // 公积金
    accumulationcertificatesFaceImgSuccess (res, file) {
      console.log(res)
      this.$set(this.submitmodel.accumulation, 'certificatesFaceImg', res.toString())
    },
    accumulationcertificatesFaceImgRemove (res, file) {
      this.submitmodel.accumulation.certificatesFaceImg = ''
    },

    // 工资卡
    salarycertificatesFaceImgSuccess (res, file) {
      this.$set(this.submitmodel.salary, 'certificatesFaceImg', res.toString())
    },
    salarycertificatesFaceImgRemove (res, file) {
      this.submitmodel.salary.certificatesFaceImg = ''
    },
    educationList_coverImg_success (index, res, file) {
      this.$set(this.submitmodel.educationList[index], 'coverImg', res.toString())
    },
    educationList_coverImg_remove (index, res, file) {
      this.$set(this.submitmodel.educationList[index], 'coverImg', res.toString())
    },
    educationList_credentialNoImg_success (index, res, file) {
      this.$set(this.submitmodel.educationList[index], 'credentialNoImg', res.toString())
    },
    educationList_credentialNoImg_remove (index, res, file) {
      this.submitmodel.educationList[index].credentialNoImg = ''
    },
    // 增加子列表
    addList (target) {
      target.push({})
    },
    // 删除子列表
    deleteList (target, index) {
      target.splice(index, 1)
    },
    getUserInfo () {
      let self = this
      getUser({ uid: this.submitmodel.userInfo.uid })
        .then(
          function (res) {
            if (res.data.code === '000000') {
              let rdata = res.data
              Object.assign(self.submitmodel, rdata.data)
              // self.submitmodel = rdata.data
              console.log(self.submitmodel)
              // 覆盖之前数据保存的邀请人
              if (getUrlQueryString('referee')) {
                self.submitmodel.userInfo.referee = getUrlQueryString('referee')
              }
            } else {
              console.log('res', res)
              self.$createDialog({
                time: 2000,
                title: '错误',
                content: res.data.msg,
                type: 'error',
                confirmBtn: {
                  text: '确定',
                  active: true,
                  disabled: false,
                  href: 'javascript:;'
                }
              }).show()
            }
          }
        ).catch((err) => {
          console.log(err)
        })
    },
    submit () {
      var self = this
      // this.submitmodel.userInfo.idNo = this.submitmodel.idCard.number
      console.log(this.submitmodel)
      // console.log(JSON.stringify(this.submitmodel))
      if (!this.submitmodel.userInfo.username ||
        !this.submitmodel.userInfo.mobile ||
        !this.submitmodel.userInfo.gender ||
        !this.submitmodel.userInfo.depId ||
        !this.submitmodel.userInfo.positionCode
      ) {
        self.$createToast({
          time: 2000,
          txt: '请完善资料',
          type: 'error'
        }).show()
      } else {
        addUser(this.submitmodel).then(function (res) {
          if (res.data.code === '000000') {
            self.$createToast({
              time: 2000,
              txt: '资料提交成功',
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
    }
  },

  created () {
    let fullPath = this.$router.currentRoute.fullPath
    console.log(this.$router.currentRoute)
    var self = this

    if (!sessionStorage.getItem('token')) {
      // localStorage.setItem('nextpage', fullPath)
      // localStorage.setItem('type', 0)
      // localStorage.setItem('invite_referee', getUrlQueryString('referee'))
      // localStorage.setItem('companyid', getUrlQueryString('companyid'))
      self.$router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else {
      this.submitmodel.userInfo.uid = localStorage.uid
      this.submitmodel.userInfo.referee = getUrlQueryString('referee')
      this.getUserInfo()
      userSelectList()
        .then(
          function (res) {
            console.log(res)
            let userSelectListData = res.data
            self.depList = userSelectListData.data.depList
            self.positionList = userSelectListData.data.positionList
          }
        ).catch(function (err) {
          console.log(err)
        })
    }
  },
  beforeMount () {
    // this.submitmodel.familyList=[...this.fields.familyListField].fill({})
    // this.familyListFields = [this.fields.familyListField]
    // this.educationListFields = [this.fields.educationListField]
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

  .cube-input-field{
    display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      width: 100%;
      padding: 0.266667rem;
      box-sizing: border-box;
      color: #666;
      line-height: inherit;
      background-color: inherit;
      border-radius: 0.053333rem;
      outline: none;
  }
</style>
