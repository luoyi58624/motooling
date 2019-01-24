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
      <!-- <cube-input v-model="value" placeholder="请输入" type="text">
      </cube-input> -->
      <!-- <cu-input v-model="test" placeholder="输入" label="test"> -->
      <!-- </cu-input> -->
    </div>

    <div>
      <div>家庭成员</div>
      <div>
        <!-- <div v-for="(item,index) in list" :key="index">
          <cu-input :label="item.label" :placeholder="item.placeholder" v-model="item.value">
          </cu-input>
        </div> -->
        <input-group :fields="fields.familyListField"></input-group>
      </div>
    </div>
    <div>
      <div>学历</div>
      <div v-for="list in educationListFields">
        <div v-for="(item,index) in list" :key="index">
          <cu-input :label="item.label" :placeholder="item.placeholder">
          </cu-input>
        </div>
      </div>
      <div @click="addList(educationListFields,fields.educationListField)">增加学历</div>
    </div>
    <cube-button type="button" @click="submit">Submit Button</cube-button>
  </div>
</template>

<script>
import CuInput from '@/components/input/Input'
import InputGroup from '@/components/input/InputGroup'

export default {
  data () {
    return {
      // test: 'testvalue',
      input: 123,
      value: '',
      fields: {
        familyListField: {
          name: {
            label: '姓名',
            placeholder: '请输入',
            value: ''
          },
          relation: {
            label: '关系',
            placeholder: '请输入',
            value: ''
          },
          phone: {
            label: '联系方式',
            placeholder: '请输入',
            value: ''
          },
          workUnit: {
            label: '工作单位',
            placeholder: '请输入',
            value: ''
          },
          currentAddress: {
            label: '现居地址',
            placeholder: '请输入',
            value: ''
          }
        },
        educationListField: {
          education: {
            label: '学历',
            placeholder: '请输入',
            value: '132'
          },
          graduationSchool: {
            label: '毕业学校',
            placeholder: '请输入',
            value: '333'
          },
          major: {
            label: '专业',
            placeholder: '请输入',
            value: ''
          },
          graduationTime: {
            label: '毕业时间',
            placeholder: '请输入',
            value: ''
          },
          coverImg: {
            label: '证件封面',
            placeholder: '请输入',
            value: ''
          },
          credentialNoImg: {
            label: '证件号页',
            placeholder: '请输入',
            value: ''
          }
        } },
      familyListFields: [],
      educationListFields: [],
      submitmodel: {
        userInfo: {
          username: '',
          mobile: '',
          positionName: ''
        },
        familyList: [{
          name: '',
          relation: ''
        }]

      }
    }
  },
  methods: {
    show () {},
    addList (target, source) {
      target.push(source)
    },
    submit () {
      console.log(this.submitmodel)
      // console.log(this.fields.familyListField)
      // console.log(this.fields.educationListField)
      // console.log(this.test)
    },
    change (e) {
      console.log(e)
    }
  },
  // computed: {
  //   submitmodel: function () {
  //     return {

  //     }
  //   },
  // },
  beforeMount () {
    this.familyListFields = [this.fields.familyListField]
    this.educationListFields = [this.fields.educationListField]
  },
  components: {
    CuInput,
    InputGroup
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
