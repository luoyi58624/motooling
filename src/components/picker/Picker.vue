<template>
    <div class="constom-input border-bottom-1px">
      <div class="constom-input_label" :class="isRequired?'is-required':''">
          <slot name="label"></slot>
      </div>
      <div class="constom-input_content" @click="showPicker">
          {{select.Text||'请选择'}}
      </div>
      <div class="tips" v-if="isRequired && !select.Text && validator ">必填项</div>
    </div>
  </template>
<script>
export default {
  name: 'CuPicker',
  props: {
    isRequired: {
      type: Boolean,
      default: false
    },
    pickerData: {
      type: Array,
      default () {
        return []
      }
    },
    alias: {
      type: Object,
      default () {
        return {
          value: 'value',
          text: 'text'
        }
      }
    },
    title: {
      type: String,
      default: '请选择'
    },
    initialSelect: {
      type: Object,
      default () {
        return {
          val: '请选择',
          Text: '请选择'
        }
      }
    },
    validator: Boolean
  },
  watch: {
    initialSelect (curSelect, oldSelect) {
      if (curSelect) {
        this.initialSelect = curSelect
        this.select = this.initialSelect
      }
    }
  },
  data () {
    return {
      select: this.initialSelect,
      // select: {
      //   val: '请选择',
      //   Text: '请选择'
      // },
      validity: {},
      valid: undefined,
      newValue: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      console.log(e.target.value)
    },
    showPicker () {
      if (!this.picker1) {
        this.picker1 = this.$createPicker({
          title: this.title,
          data: [this.pickerData],
          alias: this.alias,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker1.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.select.val = selectedVal.join(',')
      this.select.index = selectedIndex.join(',')
      this.select.Text = selectedText.join(',')
      this.$emit('select', this.select, selectedVal, selectedIndex, selectedText)

      // this.submitmodel.userInfo.depId = selectedVal.join(',')
      // this.submitmodel.userInfo.depName = selectedText.join(',')
      // console.log(this.submitmodel.userInfo.depId)
    },
    cancelHandle () {
      this.$emit('cancel')
      // this.$createToast({
      //   type: 'correct',
      //   txt: 'Picker canceled',
      //   time: 1000
      // }).show()
    }
  }
}

</script>

<style scoped>

.constom-input{
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}
.constom-input_label{
  font-size: 16px;
  width: 100px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  word-break: break-word;
  padding-top: 10px;
  padding-bottom: 10px;
}
.constom-input_content{
  flex: 1;
  font-size: 14px;
  line-height: 1.429;
  padding: 10px;
}
.cube-input::after{
  display: none
}
.is-required::before{
    color: red;
    content: "*";
    position:absolute;
    top: 10px;
    left: -8px;
    font-size: 10px;
  }
  .tips {
    position:absolute;
    top: 14px;
    right: 11px;
    font-size: 10px;
    color: red;
  }
</style>
