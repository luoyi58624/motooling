<template>
  <div>
    <div class="tips">
      xxx:欢迎您加入Motooling! 请如实填写以下信息，以便您使用简单、快捷的办公方式
    </div>
    <cu-input label="隶属部门" v-model="submitmodel.userInfo.username" placeholder="输入" >
    </cu-input>
    <cu-input label="职务" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="姓名" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="工薪等级" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="性别" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="姓名" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="民族" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="籍贯" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <cu-input label="户籍地址" v-model="submitmodel.userInfo.positionName" placeholder="输入" >
    </cu-input>
    <div>
      <div>家庭成员</div>
        <div v-for="(val, key) in submitmodel.familyList">
          <div v-for="(item,index) in fields.familyListField">
            <cu-input :label="item.label" v-model="submitmodel.familyList[key][item.name]" placeholder="输入">
            </cu-input>
          </div>
        </div>
        <div @click="addList(submitmodel.familyList)">继续添加家庭成员</div>
    </div>
    <div>
        <div>遇事紧急联系人</div>
          <div v-for="(val, key) in submitmodel.urgentContactsList">
            <div v-for="(item,index) in fields.urgentContactsListField">
              <cu-input :label="item.label" v-model="submitmodel.urgentContactsList[key][item.name]" placeholder="输入">
              </cu-input>
            </div>
          </div>
          <div @click="addList(submitmodel.urgentContactsList)">继续添加遇事紧急联系人</div>
      </div>
    <div>
      <div>学历</div>
      <div v-for="(val, key) in submitmodel.educationList">
        <div v-for="(item,index) in fields.educationListField">
          <cu-input :label="item.label" v-model="submitmodel.educationList[key][item.name]" placeholder="输入">
          </cu-input>
        </div>
      </div>
      <div @click="addList(submitmodel.educationList)">继续添加学历</div>
    </div>
    <cube-button type="button" @click="submit">Submit Button</cube-button>
  </div>
</template>

<script>
import CuInput from '@/components/input/Input'
// import InputGroup from '@/components/input/InputGroup'

export default {
  data () {
    return {
      // test: 'testvalue',
      input: 123,
      value: '',
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
          }],
        urgentContactsListField:
            [{
              name: 'name',
              label: '姓名'
            }, {
              name: 'relation',
              label: '关系',
              placeholder: '请输入'
            }, {
              name: 'phone',
              label: '联系电话',
              placeholder: '请输入'
            }, {
              name: 'workUnit',
              label: '工作单位',
              placeholder: '请输入'
            }, {
              name: 'currentAddress',
              label: '现居地址',
              placeholder: '请输入'
            }]
      },
      familyListFields: [],
      educationListFields: [],
      submitmodel: {
        userInfo: {
          username: '',
          mobile: '',
          positionName: ''
        },
        familyList: [
          {}
        ],
        educationList: [
          {}
        ],
        urgentContactsList: [{}]
      }
    }
  },
  methods: {
    show () {},
    addList (target) {
      // target.push(source)
      target.push({})
    },
    submit () {
      console.log(this.submitmodel)
      console.log(JSON.stringify(this.submitmodel))
    },
    change (e) {
      console.log(e)
    }
  },
  beforeMount () {
    // this.submitmodel.familyList=[...this.fields.familyListField].fill({})
    // this.familyListFields = [this.fields.familyListField]
    // this.educationListFields = [this.fields.educationListField]
  },
  components: {
    CuInput
    // InputGroup
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
