<template>
    <div>
      <div class="tips">
        xxx:欢迎您加入Motooling! 请如实填写以下信息，以便您使用简单、快捷的办公方式
      </div>
      <button @click="show">
        点击
      </button>
      <!-- <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler">
      </cube-form> -->
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
          <cube-form-group>
            <cube-form-item :field="fields.userInfo[0]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[1]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[2]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[3]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[4]">
                <cube-button @click="showGenderPicker">请选择性别</cube-button>
            </cube-form-item>

            <cube-form-item :field="fields.userInfo[5]">
                <cube-button @click="showNationPicker" :light="true">请选择民族</cube-button>
            </cube-form-item>
            <cube-form-item :field="fields.userInfo[6]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[7]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[8]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[9]">
                <cube-button @click="showIsMarriedPicker">请选择</cube-button>
            </cube-form-item>
            <cube-form-item :field="fields.userInfo[10]">
            </cube-form-item>

            <cube-form-item :field="fields.userInfo[11]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[12]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[13]">
              <cube-button @click="showDatePicker">{{model.dateValue || 'Please select date'}}</cube-button>
            </cube-form-item>
            <cube-form-item :field="fields.userInfo[14]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[15]">
                <cube-button @click="showBirthdayPicker">{{model.dateValue || 'Please select date'}}</cube-button>
            </cube-form-item>
            <cube-form-item :field="fields.userInfo[16]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[17]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[18]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[19]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[20]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[21]"></cube-form-item>
            <cube-form-item :field="fields.userInfo[22]"></cube-form-item>
            <!-- <cube-form-item :field="fields.userInfo[21]">
              <cube-button @click="showDatePicker">{{model.dateValue || 'Please select date'}}</cube-button>
              <date-picker ref="datePicker" :min="[2008, 8, 8]" :max="[2020, 10, 20]" @select="dateSelectHandler"></date-picker>
            </cube-form-item> -->
          </cube-form-group>

          <cube-form-group>
            <div>家庭成员</div>
            <template v-for="item in fields.familyListField">
                <cube-form-item :field="item.name"></cube-form-item>
                <cube-form-item :field="item.relation"></cube-form-item>
                <cube-form-item :field="item.phone"></cube-form-item>
                <cube-form-item :field="item.workUnit"></cube-form-item>
                <cube-form-item :field="item.currentAddress"></cube-form-item>
            </template>
            <div @click="addList(fields.familyListField,familyListField)">增加家庭成员</div>
          </cube-form-group>
          <cube-form-group>
              <div>遇事紧急联系人</div>
              <template v-for="item in fields.urgentContactsListField">
                  <cube-form-item :field="item.name"></cube-form-item>
                  <cube-form-item :field="item.relation"></cube-form-item>
                  <cube-form-item :field="item.phone"></cube-form-item>
                  <cube-form-item :field="item.workUnit"></cube-form-item>
                  <cube-form-item :field="item.currentAddress"></cube-form-item>
              </template>
              <div @click="addList(fields.urgentContactsListField,urgentContactsList)">增加紧急联系人</div>
            </cube-form-group>
            <cube-form-group>
                <div>学历情况</div>
                <template v-for="item in fields.educationListField">
                    <cube-form-item :field="item.education"></cube-form-item>
                    <cube-form-item :field="item.graduationSchool"></cube-form-item>
                    <cube-form-item :field="item.major"></cube-form-item>
                    <cube-form-item :field="item.graduationTime"></cube-form-item>
                </template>
                <div>增加学历情况</div>
              </cube-form-group>
          <cube-form-group>
            <cube-button type="submit">Submit</cube-button>
          </cube-form-group>
        </cube-form>
    </div>
  </template>

<script>
// import { uploadFile } from '@/api/upload.js'
// import request from '@/utils/request'
import { encryption, decrypt } from '@/utils/crypt'
import { nationList } from '@/data/nations'
import md5 from 'md5'
// import { strToBinary } from '@/utils/utils'

const token = ''
// const token = 'a04742ac-2307-46b4-8b58-071a93dd28b3'
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

console.log(md5String)

const req = {
  token: token,
  md5: md5String,
  timestamp: timestamp,
  data: {}
}
const fieldList = {
  familyListField: {
    name: {
      type: 'input',
      modelKey: 'inputValue',
      label: '姓名',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    relation: {
      type: 'input',
      modelKey: 'inputValue',
      label: '关系',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    phone: {
      type: 'input',
      modelKey: 'inputValue',
      label: '联系方式',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      // validating when blur
      trigger: 'blur'
    },
    workUnit: {
      type: 'input',
      modelKey: 'inputValue',
      label: '工作单位',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      // validating when blur
      trigger: 'blur'
    },
    currentAddress: {
      type: 'input',
      modelKey: 'inputValue',
      label: '现居地址',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      // validating when blur
      trigger: 'blur'
    }
  },
  urgentContactsListField: {
    name: {
      type: 'input',
      modelKey: 'inputValue',
      label: '姓名',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    relation: {
      type: 'input',
      modelKey: 'inputValue',
      label: '关系',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    phone: {
      type: 'input',
      modelKey: 'inputValue',
      label: '联系电话',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    workUnit: {
      type: 'input',
      modelKey: 'inputValue',
      label: '工作单位',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    currentAddress: {
      type: 'input',
      modelKey: 'inputValue',
      label: '现居地址',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    }
  },
  educationListField: {
    education: {
      type: 'input',
      modelKey: 'inputValue',
      label: '学历',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    graduationSchool: {
      type: 'input',
      modelKey: 'inputValue',
      label: '毕业学校',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    major: {
      type: 'input',
      modelKey: 'inputValue',
      label: '专业',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    graduationTime: {
      type: 'input',
      modelKey: 'inputValue',
      label: '毕业时间',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    coverImg: {
      type: 'input',
      modelKey: 'inputValue',
      label: '证件封面',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    },
    credentialNoImg: {
      type: 'input',
      modelKey: 'inputValue',
      label: '证件号页',
      props: {
        placeholder: '请输入'
      },
      rules: {
      },
      trigger: 'blur'
    }
  }
}
const encryptionData = encryption(JSON.stringify(req))
export default {
  data () {
    return {
      validity: {},
      valid: undefined,
      model: {
        checkboxValue: false,
        checkboxGroupValue: [],
        inputValue: '',
        radioValue: '',
        rateValue: 0,
        selectValue: 2018,
        switchValue: true,
        textareaValue: '',
        uploadValue1: [],
        uploadValue2: [],
        uploadValue3: [],
        uploadValue4: [],
        uploadValue5: [],
        username: '23333',
        userInfo: {
          wagesLevel: '222',
          username: 1222
        }
      },
      familyListField: fieldList.familyListField,
      urgentContactsListField: fieldList.urgentContactsListField,
      educationList: fieldList.educationList,
      userWorkList: fieldList.userWorkList,
      fields: {
        userInfo: [
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '隶属部门',
            props: {
              placeholder: '请输入'
            },
            rules: {
              required: true
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '职务',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'username',
            label: '姓名',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          // {
          //   type: 'input',
          //   modelKey: 'inputValue',
          //   label: '英文名',
          //   props: {
          //     placeholder: '请输入'
          //   },
          //   rules: {
          //   },
          //   // validating when blur
          //   trigger: 'blur'
          // },
          {
            type: 'input',
            modelKey: 'wagesLevel',
            label: '工薪等级',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'gender',
            label: '性别',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'nation',
            label: '民族',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'nativePlace',
            label: '籍贯',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'permanentAddress',
            label: '户籍地址',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '现居地址',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'select',
            modelKey: 'isMarried',
            label: '是否已婚',
            props: {
              options: [2015, 2016, 2017, 2018, 2019, 2020]
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'politicalOutlook',
            label: '政治面貌',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'mobile',
            label: '手机',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'cardId',
            label: '员工卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '入职日期',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '身份证号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '出生日期',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },

          {
            type: 'upload',
            modelKey: 'uploadValue1',
            label: '身份证原件',
            props: {
              action: {
                target: 'https://upload.oonnnoo.com/upload',
                fileName: 'upfile',
                // target: '/img/uploadImg',
                // fileName: 'imgFile',
                data: {
                  paramsData: encryptionData
                },
                checkSuccess: (res, file) => {
                  console.log('res', res)
                  let rdata = decrypt(res.resultData)
                  if (rdata.status === 0) {
                  // this.uploadValue1 = rdata.url
                    return true
                  }
                  return true
                }
              },
              max: 2
            },
            events: {
              'file-removed': (...args) => {
                console.log('file removed', args)
              },
              'files-added': (...args) => {
                console.log('add', args)
              },
              'file-submitted': (file) => {
              // var form = new FormData()
              // form.append('upfile', file.file)
              // var up2 = uploadFile(form)
              // console.log('up2', up2)
                console.log('file-submitted-file', file)
              }

            },
            // rules: {
            //   uploaded: (val, config) => {
            //     return Promise.all(val.map((file, i) => {
            //       return new Promise((resolve, reject) => {
            //         console.log(file)
            //         uploadFile(

            //         )
            //         if (file.uploadedUrl) {
            //           return resolve()
            //         }
            //         // // fake request
            //         // setTimeout(() => {
            //         //   if (i % 2) {
            //         //     reject(new Error())
            //         //   } else {
            //         //     file.uploadedUrl = 'uploaded/url'
            //         //     resolve()
            //         //   }
            //         // }, 1000)
            //       })
            //     })).then(() => {
            //       return true
            //     })
            //   }
            // },
            messages: {
              uploaded: '上传失败'
            }
          },

          {
            type: 'input',
            modelKey: 'inputValue',
            label: '社保卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'upload',
            modelKey: 'uploadValue2',
            label: '社保卡原件',
            events: {
              'file-removed': (...args) => {
                console.log('file removed', args)
              }
            },
            rules: {
              uploaded: (val, config) => {
                return Promise.all(val.map((file, i) => {
                  return new Promise((resolve, reject) => {
                    if (file.uploadedUrl) {
                      return resolve()
                    }
                    // fake request
                    setTimeout(() => {
                      if (i % 2) {
                        reject(new Error())
                      } else {
                        file.uploadedUrl = 'uploaded/url'
                        resolve()
                      }
                    }, 1000)
                  })
                })).then(() => {
                  return true
                })
              }
            },
            messages: {
              uploaded: '上传失败'
            }
          },

          {
            type: 'input',
            modelKey: 'inputValue',
            label: '公积金号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'upload',
            modelKey: 'uploadValue3',
            label: '公积金原件',
            events: {
              'file-removed': (...args) => {
                console.log('file removed', args)
              }
            },
            rules: {
              uploaded: (val, config) => {
                return Promise.all(val.map((file, i) => {
                  return new Promise((resolve, reject) => {
                    if (file.uploadedUrl) {
                      return resolve()
                    }
                    // fake request
                    setTimeout(() => {
                      if (i % 2) {
                        reject(new Error())
                      } else {
                        file.uploadedUrl = 'uploaded/url'
                        resolve()
                      }
                    }, 1000)
                  })
                })).then(() => {
                  return true
                })
              }
            },
            messages: {
              uploaded: '上传失败'
            }
          },

          {
            type: 'input',
            modelKey: 'inputValue',
            label: '工资卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'upload',
            modelKey: 'uploadValue4',
            label: '工资卡原件',
            events: {
              'file-removed': (...args) => {
                console.log('file removed', args)
              }
            },
            rules: {
              uploaded: (val, config) => {
                return Promise.all(val.map((file, i) => {
                  return new Promise((resolve, reject) => {
                    if (file.uploadedUrl) {
                      return resolve()
                    }
                    // fake request
                    setTimeout(() => {
                      if (i % 2) {
                        reject(new Error())
                      } else {
                        file.uploadedUrl = 'uploaded/url'
                        resolve()
                      }
                    }, 1000)
                  })
                })).then(() => {
                  return true
                })
              }
            },
            messages: {
              uploaded: '上传失败'
            }
          }

        ],
        // },

        familyListField: [fieldList.familyListField],
        // 紧急联系人
        urgentContactsListField: [
          fieldList.urgentContactsListField ],
        // 学历
        educationListField: [
          fieldList.educationListField
        ],
        // 工作经历
        userWorkList: [{
          workUnit: '',
          dutiesMax: '',
          inaugurationTime: '',
          quitTime: '',
          quitReason: '',
          witness: '',
          witnessPhone: '',
          workAddress: ''
        }],
        // 用户企业信息
        userCompanyInfo: [
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '工资卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '工资卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '工资卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          },
          {
            type: 'input',
            modelKey: 'inputValue',
            label: '工资卡号',
            props: {
              placeholder: '请输入'
            },
            rules: {
            },
            // validating when blur
            trigger: 'blur'
          }
        ]
      }

    }
  },
  computed: {
    submitmodel: function () {
      return {
        // userInfo: {
        //   username: this.model.username,
        //   mobile:this.model.mobile,
        //   gender:this.model.gender,
        //   birthday:this.model.birthday,
        //   avatar:this.model.avatar,
        //   // idNo:this.model.idNo,
        //   address:this.model.address,
        //   depId:this.model.depId,
        //   // positionCode:this.model.positionCode,
        //   // positionName:this.model.positionName,
        //   uid:this.model.uid,
        // },
        // idCard: {
        //   name: '身份证',
        //   number: '12345678901222222',
        //   certificatesFaceImg: this.model.uploadValue1[0].response.data.filename
        // },
        'userInfo': {
          'username': this.model.username,
          'mobile': this.model.mobile,
          'gender': this.model.gender,
          'birthday': this.model.birthday,
          'avatar': this.model.avatar,
          'idNo': this.model.idNo,
          'address': this.model.address,
          'depId': this.model.depId,
          'positionCode': this.model.positionCode,
          'positionName': this.model.positionName,
          'uid': this.model.uid
        },
        'userCompanyInfo': {
          'workName': '',
          'wagesLevel': '',
          'nation': '',
          'nativePlace': '',
          'permanentAddress': '',
          'isMarried': 'int',
          'politicalOutlook': '',
          'cardId': '',
          'workStart': '',
          'id': 'long'
        },
        'idCard': {
          'name': '',
          'number': '',
          'isHandled': 'int',
          'certificatesFaceImg': '',
          'certificatesBackImg': '',
          'id': 'long'
        },
        'socialSecurity': {
          'name': '',
          'number': '',
          'isHandled': 'int',
          'certificatesFaceImg': '',
          'certificatesBackImg': '',
          'id': 'long'
        },
        'accumulation': {
          'name': '',
          'number': '',
          'isHandled': 'int',
          'certificatesFaceImg': '',
          'certificatesBackImg': '',
          'id': 'long'
        },
        'salary': {
          'name': '',
          'number': '',
          'isHandled': '',
          'certificatesFaceImg': '',
          'certificatesBackImg': '',
          'id': 'long'
        },
        'familyList': [{
          'id': 'long',
          'name': '',
          'relation': '',
          'phone': '',
          'workUnit': '',
          'currentAddress': ''
        }],
        'urgentContactsList': [{
          'id': 'long',
          'name': '',
          'relation': '',
          'phone': '',
          'workUnit': '',
          'currentAddress': ''
        }],
        'educationList': [{
          'id': 'long',
          'education': '',
          'graduationSchool': '',
          'major': '',
          'graduationTime': '',
          'coverImg': '',
          'credentialNoImg': ''
        }],
        'userWorkList': [{
          'id': 'long',
          'workUnit': '',
          'dutiesMax': '',
          'inaugurationTime': '',
          'quitTime': '',
          'quitReason': '',
          'witness': '',
          'witnessPhone': '',
          'workAddress': ''
        }]
      }
    }
  },
  methods: {
    show () {
      console.log(this.model)
    },
    // showDatePicker() {
    //   // this.$refs.datePicker.show()
    // },
    showDatePicker () {
      if (!this.datePicker1) {
        this.datePicker1 = this.$createDatePicker({
          title: '入职日期',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker1.show()
    },
    showBirthdayPicker () {
      if (!this.datePicker2) {
        this.datePicker2 = this.$createDatePicker({
          title: '出生日期',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker2.show()
    },
    showGenderPicker () {
      if (!this.picker1) {
        this.picker1 = this.$createPicker({
          title: '选择性别',
          data: [[{ text: '待定', value: '0' }, { text: '男', value: '1' }, { text: '女', value: '2' }]],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker1.show()
    },
    showNationPicker () {
      if (!this.picker2) {
        this.picker2 = this.$createPicker({
          title: '选择民族',
          data: [nationList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker2.show()
    },
    showIsMarriedPicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '是否已婚',
          data: [[{ text: '未婚', value: '0' }, { text: '已婚', value: '1' }]],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle () {

    },
    cancelHandle () {

    },
    addList (target, source) {
      target.push(
        source
      )
    },

    submitHandler (e, model) {
      e.preventDefault()
      console.log('submit', e)
      console.log('submit-model', model)
      console.log('submitmodel', this.submitmodel)
    },
    validateHandler (result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    }
  }
  // components: {
  //   DatePicker
  // }
}
</script>

<style scoped>
  .tips{
    font-size: 16px;
    line-height: 1.4;
    padding: 10px;
    text-indent: 2em;
  }
</style>
