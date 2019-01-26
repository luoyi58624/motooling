<template>
  <div>
    <div class="tips">
      xxx:欢迎您加入Motooling! 请如实填写以下信息，以便您使用简单、快捷的办公方式
    </div>
    <!-- 免冠照 -->
    <cu-upload
    @file-success="fileSuccess1"
    @file-remove="fileRemove1"
    :max='1'>
    <div slot="label">
      免冠照片
    </div>
    </cu-upload>
    <cu-picker :pickerData="depList" @select="select" @cancel="cancel"
    :alias="depAlias">
      <div slot="label">
        隶属部门
      </div>
    </cu-picker>
    <cu-picker :pickerData="positionList" @select="select" @cancel="cancel" :alias="positionAlias">
      <div slot="label">
        职位
      </div>
    </cu-picker>
    <!-- <cu-input label="uid" v-model="submitmodel.userInfo.uid" placeholder="输入" >
    </cu-input> -->
    <cu-input label="referee" v-model="submitmodel.userInfo.referee" placeholder="输入" >
    </cu-input>
    <cu-input label="姓名" v-model="submitmodel.userInfo.username" placeholder="输入" >
    </cu-input>
    <cu-input label="性别" v-model="submitmodel.userInfo.gender" placeholder="输入" >
    </cu-input>
    <cu-input label="工作姓名" v-model="submitmodel.userCompanyInfo.workName" placeholder="输入" >
    </cu-input>
    <cu-input label="工薪等级" v-model="submitmodel.userCompanyInfo.wagesLevel" placeholder="输入" >
    </cu-input>
    <!-- <cu-input label="" v-model="submitmodel.userCompanyInfo.nation" placeholder="输入" >
    </cu-input> -->
    <cu-picker :pickerData="nationList" @select="nationSelect" @cancel="nationCancel">
      <div slot="label">
        民族
      </div>
    </cu-picker>
    <cu-input label="籍贯" v-model="submitmodel.userInfo.nativePlace" placeholder="输入" >
    </cu-input>
    <cu-input label="户籍地址" v-model="submitmodel.userInfo.permanentAddress" placeholder="输入" >
    </cu-input>
    <cu-input label="是否已婚" v-model="submitmodel.userCompanyInfo.isMarried" placeholder="输入" >
    </cu-input>
    <cu-input label="政治面貌" v-model="submitmodel.userCompanyInfo.politicalOutlook" placeholder="输入" >
    </cu-input>
    <cu-input label="联系电话" v-model="submitmodel.userInfo.mobile" placeholder="输入" >
    </cu-input>
    <cu-input label="员工卡号" v-model="submitmodel.userCompanyInfo.cardId" placeholder="输入" >
    </cu-input>
    <cu-input label="入职日期" v-model="submitmodel.userCompanyInfo.workStart" placeholder="输入" >
    </cu-input>
    <cu-input label="出生日期" v-model="submitmodel.userInfo.birthday" placeholder="输入" >
    </cu-input>
    <cu-input label="身份证号" v-model="submitmodel.userInfo.idNo" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="fileSuccess2"
    @file-remove="fileRemove2"
    :max='1'>
    <div slot="label">身份证原件正面</div>
    </cu-upload>
    <cu-upload
    @file-success="fileSuccess3"
    @file-remove="fileRemove3"
    :max='1'>
    <div slot="label">身份证反面</div>
    </cu-upload>
    <cu-input label="社保卡号" v-model="submitmodel.socialSecurity.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="fileSuccess3"
    @file-remove="fileRemove3"
    :max='1'>
    <div slot="label">社保卡原件</div>
    </cu-upload>

    <cu-input label="公积金号" v-model="submitmodel.accumulation.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="fileSuccess4"
    @file-remove="fileRemove4"
    :max='1'>
    <div slot="label">公积金卡原件</div>
    </cu-upload>
    <cu-input label="工资卡号" v-model="submitmodel.salary.number" placeholder="输入" >
    </cu-input>
    <cu-upload
    @file-success="fileSuccess5"
    @file-remove="fileRemove5"
    :max='1'>
    <div slot="label">工资卡原件</div>
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
import CuInput from '@/components/input/Input'
import CuUpload from '@/components/upload/Upload'
import CuPicker from '@/components/picker/Picker'
import { addUser, userSelectList } from '@/api/Person/adduser.js'
import { getUrlQueryString } from '@/utils/utils.js'
import {nationList} from  '@/data/nations.js'
export default {
  data () {
    return {
      // test: 'testvalue',
      input: 123,
      value: '',
      nationList:nationList,
      // 职位列表
      // positionList:[],
      positionList: [
        { 'isUse': true, 'isDefault': '0', 'code': '1', 'name': 'CEO' },
        { 'isUse': true, 'isDefault': '0', 'code': '3', 'name': '总经理' },
        { 'isUse': true, 'isDefault': '0', 'code': '2', 'name': '总裁' },
        { 'isUse': true, 'isDefault': '0', 'code': '6', 'name': '职员' },
        { 'isUse': true, 'isDefault': '0', 'code': '4', 'name': '部门经理' },
        { 'isUse': true, 'isDefault': '0', 'code': '5', 'name': '项目经理' }
      ],
      depAlias: {
        value: 'depId',
        text: 'depName'
      },
      positionAlias:{
        value: 'code',
        text: 'name'
      },

      // 部门列表
      // depList:[],
      depList: [
        { 'depPic': ' ', 'depId': 1, 'depNameEn': 'Marketing Department', 'depName': '市场部' },
        { 'depPic': ' ', 'depId': 2, 'depNameEn': 'Design Department', 'depName': '设计部' },
        { 'depPic': ' ', 'depId': 3, 'depNameEn': 'Purchasing Department', 'depName': '采购部' },
        { 'depPic': ' ', 'depId': 4, 'depNameEn': 'Production Department', 'depName': '生产部' },
        { 'depPic': ' ', 'depId': 5, 'depNameEn': 'Storehouse', 'depName': '仓库' },
        { 'depPic': ' ', 'depId': 6, 'depNameEn': 'QC Department', 'depName': '质检部' },
        { 'depPic': ' ', 'depId': 7, 'depNameEn': 'Office Manager', 'depName': '总经办' },
        { 'depPic': ' ', 'depId': 8, 'depNameEn': '', 'depName': '人工小组一' },
        { 'depPic': ' ', 'depId': 9, 'depNameEn': '', 'depName': '机器小组一' }
      ],

      fields: {
        familyListField: [
          {
            name: 'name',
            label: '姓名',
            placeholder: '请输入'
          },
          {
            name: 'relation',
            label: '关系',
            placeholder: '请输入',
            value: ''
          },
          {
            name: 'phone',
            label: '联系方式',
            placeholder: '请输入',
            value: ''
          },
          { name: 'workUnit',
            label: '工作单位',
            placeholder: '请输入',
            value: ''
          },
          {
            name: 'currentAddress',
            label: '现居地址',
            placeholder: '请输入',
            value: ''
          }
        ],
        educationListField: [
          { name: 'education',
            label: '学历',
            placeholder: '请输入',
            value: '132'
          },
          {
            name: 'graduationSchool',
            label: '毕业学校',
            placeholder: '请输入',
            value: '333'
          },
          {
            name: 'major',
            label: '专业',
            placeholder: '请输入',
            value: ''
          },
          { name: 'graduationTime',
            label: '毕业时间',
            placeholder: '请输入',
            value: ''
          },
          { name: 'coverImg',
            label: '证件封面',
            placeholder: '请输入',
            value: ''
          },
          { name: 'credentialNoImg',
            label: '证件号页',
            placeholder: '请输入',
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
            placeholder: '请输入'
          },
          {
            name: 'phone',
            label: '联系电话',
            placeholder: '请输入'
          },
          {
            name: 'workUnit',
            label: '工作单位',
            placeholder: '请输入'
          },
          {
            name: 'currentAddress',
            label: '现居地址',
            placeholder: '请输入'
          }
        ],
        userWorkListField: [
          { name: 'workUnit',
            label: '工作单位',
            placeholder: '请输入'
          },
          { name: 'dutiesMax',
            label: '最高职务',
            placeholder: '请输入'
          },
          { name: 'inaugurationTime',
            label: '就职时间',
            placeholder: '请输入'
          },
          { name: 'quitTime',
            label: '离职时间',
            placeholder: '请输入'
          },
          { name: 'quitReason',
            label: '离职原因',
            placeholder: '请输入'
          },
          { name: 'witness',
            label: '证明人',
            placeholder: '请输入'
          },
          { name: 'witnessPhone',
            label: '证明人电话',
            placeholder: '请输入'
          },
          { name: 'workAddress',
            label: '工作地址',
            placeholder: '请输入'
          }
        ]
      },
      familyListFields: [],
      educationListFields: [],
      // 待提交至后端的表单数据
      submitmodel: {
        userInfo: {
          referee: '456',
          // uid: '123',
          username: '李',
          mobile: '18565705036',
          positionName: '',
          avatar: '',
          depId: '1',
          depName: '市场部',
          positionName: '总经理',
          positionCode: '3',
          gender: 0
        },
        userCompanyInfo: {
          workName: '李工作'
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
    show () {
      console.log(JSON.stringify(this.depList))
      console.log(JSON.stringify(this.positionList))
    },
    positionSelect (val) {
      console.log('select')
      console.log(val)
    },
    positionCancel () {
      console.log('cancel')
    },
    depSelect(){

    },
    depCancel(){

    },
    nationSelect(){
      console.log('nationSelect')
      console.log(nationList)
    },
    nationCancel(){

    },
    // 第一个参数为URL集合
    // 第二个参数 解密后的返回值，
    // 第三个参数：文件对象
    fileSuccess1 (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    fileRemove1 (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    fileSuccess2 (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    fileRemove2 (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    fileSuccess3 (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    fileRemove3 (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    fileSuccess4 (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    fileRemove4 (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    fileSuccess5 (res, file) {
      // console.log(res)
      this.submitmodel.userInfo.avatar = res.toString()
    },
    fileRemove5 (res, file) {
      this.submitmodel.userInfo.avatar = ''
    },
    showPicker1 () {
      console.log(123)
      if (!this.picker1) {
        console.log(this.depList)
        this.picker1 = this.$createPicker({
          title: 'Picker',
          data: [this.depList],
          alias: {
            value: 'depId',
            text: 'depName'
          },
          onSelect: this.selectHandle1,
          onCancel: this.cancelHandle1
        })
      }
      this.picker1.show()
    },
    showPicker2 () {
      console.log(123)
      if (!this.picker2) {
        console.log(this.positionList)
        this.picker2 = this.$createPicker({
          title: 'Picker',
          data: [this.positionList],
          alias: {
            value: 'code',
            text: 'name'
          },
          onSelect: this.selectHandle2,
          onCancel: this.cancelHandle2
        })
      }
      this.picker2.show()
    },
    selectHandle1 (selectedVal, selectedIndex, selectedText) {
      this.submitmodel.userInfo.depId = selectedVal.join(',')
      this.submitmodel.userInfo.depName = selectedText.join(',')
      console.log(this.submitmodel.userInfo.depId)
    },
    cancelHandle1 () {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show()
    },
    selectHandle2 (selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal)
      this.submitmodel.userInfo.positionCode = selectedVal.join(',')
      this.submitmodel.userInfo.positionName = selectedText.join(',')
    },
    cancelHandle2 () {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show()
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
      console.log(this.submitmodel)
      console.log(JSON.stringify(this.submitmodel))
      addUser(this.submitmodel).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    // this.submitmodel.userInfo.uid = getUrlQueryString('uid')
    // this.submitmodel.userInfo.referee = getUrlQueryString('referee')
    var self = this
    userSelectList()
    .then(
      function (res) {
        console.log(res)
        let userSelectListData = JSON.parse(res.data.resultData)
        self.depList = userSelectListData.data.depList
        self.positionList = userSelectListData.data.positionList
      }
    ).catch(function (err) {
      console.log(err)
    })
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

</style>
