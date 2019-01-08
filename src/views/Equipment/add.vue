<template>
  <div>
      <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler">
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
        uploadValue: []
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '设备编号',
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
                label: '设备型号',
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
                label: '设备品牌',
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
                label: '设备型号',
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
                label: '购买时间',
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
                type: 'upload',
                modelKey: 'uploadValue',
                label: '设备照片',
                events: {
                  'file-removed': (...args) => {
                    console.log('file removed', args)
                  }
                },
                rules: {
                  required: true,
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
                type: 'textarea',
                modelKey: 'textareaValue',
                label: '设备参数',
                rules: {
                  required: true
                },
                // debounce validate
                // if set to true, the default debounce time will be 200(ms)
                debounce: 100
              },
              {
                type: 'textarea',
                modelKey: 'textareaValue',
                label: '售后服务信息',
                rules: {
                  required: true
                },
                // debounce validate
                // if set to true, the default debounce time will be 200(ms)
                debounce: 100
              },
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '供应商',
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
                label: '联系人',
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
                label: '联系电话',
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
                type: 'switch',
                modelKey: 'switchValue',
                label: '是否开放Sourcing',
                rules: {
                  required: true
                }
              },
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '设备费率',
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
                label: '设备购买成本（元）',
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
                label: '职位',
                props: {
                  placeholder: '请输入'
                },
                rules: {
                  required: true
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
                required: true
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
                required: true
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
                required: true
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
                required: true
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
                required: true
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
                required: true
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
                required: true
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
                required: true
              },
              // validating when blur
              trigger: 'blur'
            }
            ] },
          { legend: '技术资料',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '主要产品',
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
                label: '最大设备',
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
                type: 'select',
                modelKey: 'selectValue',
                label: '设计软件',
                props: {
                  options: [1, 2, 3, 4]
                },
                rules: {
                  required: true
                }
              }

            ]
          },
          { legend: '其他',
            fields: [
              {
                type: 'textarea',
                modelKey: 'textareaValue',
                label: '备注',
                rules: {
                  required: true
                },
                // debounce validate
                // if set to true, the default debounce time will be 200(ms)
                debounce: 100
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
