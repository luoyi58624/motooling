<!--  -->
<template>
  <div class="stepper">
    <div @click="minu">
      <i class="cubeic-remove"></i>
    </div>
    <div>
      <input type="text" :value="val" />
    </div>
    <div @click="plus">
      <i class="cubeic-add"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: this.value

    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },

  methods: {
    plus () {
      if (this.val < this.max) {
        this.val = this.val + 1
        this.$emit('input', this.val)
      }
      // 触发 input 事件，并传入新值
    },
    minu () {
      if (this.val > 0) {
        this.val = this.val - 1
        this.$emit('input', this.val) // 触发 input 事件，并传入新值
      }
    }
  }
}

</script>
<style lang='less' scoped>
.stepper {
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:nth-child(2n + 1) {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    text-align: center;
    line-height: 18px;
    color: #5594ff;
    font-size: 20px;
  }
  > div {
    > input {
      width: 30px;
      border: 1px solid #d6d6d6;
      height: 12px;
      line-height: 12px;
      padding: 0;
      color: #acabac;
      text-align: center;
      font-size: 10px;
    }
  }
}
</style>
