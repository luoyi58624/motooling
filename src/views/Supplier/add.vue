<template>
    <div>
        <div class="tips">
            欢迎贵司成为XXX供应商！ 请如实填写以下信息，以便贵司顺利加入XXX供应商行列。
          </div>
        <cube-form
        :model="model"
        :schema="schema"
        :immediate-validate="false"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler">
        <!-- <cube-form-item :field="fields[2]">
          <cube-button @click="showDatePicker">{{model.dateValue || 'Please select date'}}</cube-button>
          <date-picker ref="datePicker" :min="[2008, 8, 8]" :max="[2020, 10, 20]" @select="dateSelectHandler"></date-picker>
        </cube-form-item> -->
      </cube-form>
    </div>
  </template>

<script>
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
        uploadValue2: []
      },
      schema: {
        groups: [
          {
            legend: '基础',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '公司全称',
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
                label: '公司地址',
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
                label: '公司电话',
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
                label: '公司传真',
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
                label: '公司网址',
                props: {
                  placeholder: '请输入'
                },
                rules: {
                },
                // validating when blur
                trigger: 'blur'
              }

            ] },
          {
            legend: '联系人信息',
            fields: [{
              type: 'input',
              modelKey: 'inputValue',
              label: '姓名',
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
              label: '联系电话',
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
              label: '传真',
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
              label: 'E-Mail',
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
              label: '职位',
              props: {
                placeholder: '请输入'
              },
              rules: {
              },
              // validating when blur
              trigger: 'blur'
            }]
          },
          {
            legend: '结算信息',
            fields: [{
              type: 'select',
              modelKey: 'selectValue',
              label: '结算币种',
              props: {
                options: [1, 2, 3, 4]
              },
              rules: {
              }
            },
            {
              type: 'select',
              modelKey: 'selectValue',
              label: '结算方式',
              props: {
                options: [1, 2, 3, 4]
              },
              rules: {
              }
            },
            {
              type: 'select',
              modelKey: 'selectValue',
              label: '发票类型',
              props: {
                options: [1, 2, 3, 4]
              },
              rules: {
              }
            },
            {
              type: 'select',
              modelKey: 'selectValue',
              label: '税率',
              props: {
                options: [1, 2, 3, 4]
              },
              rules: {
              }
            },
            {
              type: 'select',
              modelKey: 'selectValue',
              label: '付款方式',
              props: {
                options: [1, 2, 3, 4]
              },
              rules: {
              }
            },
            {
              type: 'input',
              modelKey: 'inputValue',
              label: '税务账号',
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
              label: '开户银行',
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
              label: '银行账号',
              props: {
                placeholder: '请输入'
              },
              rules: {
              },
              // validating when blur
              trigger: 'blur'
            }
            ] },
          { legend: '证件资料',
            fields: [
              {
                type: 'upload',
                modelKey: 'uploadValue1',
                label: '营业执照原件',
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
                type: 'upload',
                modelKey: 'uploadValue2',
                label: '体系证书原件',
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
            ]
          },
          {
            legend: '供应商类型',
            fields: [
              {
                type: 'checkbox-group',
                modelKey: 'checkboxGroupValue',
                label: '供应商类型',
                props: {
                  options: ['成品工装', '模胚', '毛胚', '库存原料', '标准件', '工量具', '辅料', '办公用品', '刀具', '外协加工']
                },
                rules: {
                }
              }
            ]
          },
          {
            fields: [
              {
                type: 'submit',
                label: '提交'
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard' // classic fresh
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault()
      console.log('submit', e)
    },
    validateHandler (result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    }
  }
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
