<!--  -->
<template>
  <div class="wuliao">
    <div class="left-wrapper">
      <img src alt />
    </div>
    <div class="right-wrapper">
      <div class="right-top">
        <div class="right-top-left">
          <div class="info-bar" v-for="(item,index) in info.list" :key="index">
            <div>{{item.title}}:</div>
            <div>{{item.content}}</div>
          </div>
        </div>
        <div class="right-top-right" v-if="true">
          <span class="iconfont icon-iconfontxuanzhong4"></span>
        </div>
        <!-- <div class="right-wrapper" v-if="true">
                <span class="iconfont icon-iconset0141"></span>
        </div>-->
      </div>
      <div class="right-bottom">
        <div style="display:flex;">
          收货数量&nbsp;&nbsp;
          <stepper :max="info.max" @input="change" :value="val"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stepper from '@/components/stepper'
export default {
  data () {
    return {

    }
  },
  props: {
    info: {
      type: Object,
      default: function () { return {} }
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    val () {
      return this.value
    }
  },
  components: {
    stepper
  },
  methods: {
    change (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang='less' scoped>
.wuliao {
  border-bottom: 1px solid #f2f2f2;
  padding-right: 15px;
  padding-top: 15px;
  margin-left: 15px;
  display: flex;
  .left-wrapper {
    width: 100px;
    > img {
      width: 100%;
    }
  }
  .right-wrapper {
    flex: 1;
    font-size: 14px;
    color: #a0a0a0;
    > .right-top {
      display: flex;
      align-items: center;
      > .right-top-left {
        flex: 1;
        > .info-bar {
          padding: 4px 0;
          display: flex;
          > div:first-child {
            width: 64px;
          }
        }
      }
      > .right-top-right {
        width: 30px;
        > span {
          font-size: 30px;
        }
      }
    }
    > .right-bottom {
      display: flex;
      justify-content: flex-end;
      > div {
        display: flex;
        align-items: center;
        padding: 10px 0;
      }
    }
  }
}
</style>
