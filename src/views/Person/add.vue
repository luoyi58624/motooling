<template>
    <div>
      <div class="tips">
        xxx:欢迎您加入Motooling! 请如实填写以下信息，以便您使用简单、快捷的办公方式
      </div>
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
        uploadValue1: [],
        uploadValue2: [],
        uploadValue3: [],
        uploadValue4: [],
        uploadValue5: []

      },
      schema: {
        groups: [
          {
            legend: '基本信息',
            fields: [
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
                  required: true
                },
                // validating when blur
                trigger: 'blur'
              },
              {
                type: 'input',
                modelKey: 'inputValue',
                label: '姓名',
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
                label: '英文名',
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
                label: '工薪等级',
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
                label: '性别',
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
                label: '民族',
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
                label: '籍贯',
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
                label: '户籍地址',
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
                label: '现居地址',
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
                label: '是否已婚',
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
                label: '政治面貌',
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
                type: 'input',
                modelKey: 'inputValue',
                label: '员工卡号',
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
                label: '入职日期',
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
                label: '身份证号',
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
                label: '出生日期',
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
                modelKey: 'uploadValue1',
                label: '身份证原件',
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
                type: 'input',
                modelKey: 'inputValue',
                label: '社保卡号',
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
                modelKey: 'uploadValue2',
                label: '社保卡原件',
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
                type: 'input',
                modelKey: 'inputValue',
                label: '公积金号',
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
                modelKey: 'uploadValue3',
                label: '公积金原件',
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
                type: 'input',
                modelKey: 'inputValue',
                label: '工资卡号',
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
                modelKey: 'uploadValue4',
                label: '工资卡原件',
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
              }

            ] },
          {
            legend: '家庭成员',
            fields: [{
              type: 'input',
              modelKey: 'inputValue',
              label: '姓名',
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
              label: '关系',
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
              type: 'input',
              modelKey: 'inputValue',
              label: '工作单位',
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
              label: '现居地址',
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
            legend: '遇事紧急联系人',
            fields: [{
              type: 'input',
              modelKey: 'inputValue',
              label: '姓名',
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
              label: '关系',
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
              type: 'input',
              modelKey: 'inputValue',
              label: '工作单位',
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
              label: '现居地址',
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
            legend: '学历情况',
            fields: [{
              type: 'input',
              modelKey: 'inputValue',
              label: '学历',
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
              label: '毕业学院',
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
              label: '专业',
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
              label: '毕业时间',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
              // validating when blur
              trigger: 'blur'
            }, {
              type: 'upload',
              modelKey: 'uploadValue5',
              label: '毕业证/学位证原件',
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
            }

            ]
          },
          {
            legend: '工作经历',
            fields: [{
              type: 'input',
              modelKey: 'inputValue',
              label: '工作单位',
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
              label: '最高职位',
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
              label: '就职时间',
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
              label: '离职原因',
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
              label: '工作地址',
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
              label: '证明人',
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
              label: '证明人联系电话',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              },
              // validating when blur
              trigger: 'blur'
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
