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
            legend: '基础',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '公司编号',
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
                label: '公司简介',
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
                label: '公司全称',
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
            legend: '联系人',
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
              label: '部门',
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
          {
            legend: '技术资料',
            fields: [
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '主要产品',
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
                label: '最大设备',
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
                modelKey: 'selectValue',
                label: '设计软件',
                props: {
                  options: [1, 2, 3, 4]
                },
                rules: {
                }
              }

            ]
          },
          {
            legend: '其他',
            fields: [
              {
                type: 'textarea',
                modelKey: 'textareaValue',
                label: '备注',
                rules: {
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
