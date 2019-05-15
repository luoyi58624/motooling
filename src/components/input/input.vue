<template>
  <div class="constom-input border-bottom-1px ">
    <div class="constom-input_label" :class="isRequired?'is-required':''">
      <span v-text="label"></span>
    </div>
    <div class="constom-input_content">
      <cube-input v-model="newValue" @change="handleInput" :placeholder="placeholder" type="text" :disabled="disabled">
      </cube-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CuInput',
  model: {
    value: ''
  },
  props: {
    label: {
      type: String
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    placeholder: String
  },
  data () {
    return {
      validity: {},
      valid: undefined,
      newValue: this.value
    }
  },
  watch: {
    value (curSelect, oldSelect) {
      if (curSelect) {
        this.initialSelect = curSelect
        this.newValue = curSelect
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      console.log(e.target.value)
    }
  }
}

</script>

<style>

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
    position: relative;
  }
  .constom-input_content{
    flex: 1
  }
  .cube-input::after{
    display: none
  }
  .is-required::before{
    color: red;
    content: "*";
    position:absolute;
    top: 0;
    left: -8px;
    font-size: 10px;
  }
  </style>
