<!--  -->
<template>
  <div class="wuliao" v-if="info.list&&info.list[4].title==='库存数量'?info.list[4].content>0:true">
    <div class="left-wrapper">
      <img :src="img||require('@/assets/default.png')" alt />
    </div>
    <div class="right-wrapper">
      <div class="right-top">
        <div class="right-top-left">
          <div class="info-bar" v-for="(item,index) in info.list" :key="index">
            <div>{{item.title}}:</div>
            <div>{{item.content}}</div>
          </div>
        </div>
        <div class="right-top-right" v-if="true" @click="select">
          <span class="iconfont icon-iconfontxuanzhong4" :class="{active:selected}"></span>
        </div>
        <!-- <div class="right-wrapper" v-if="true">
                <span class="iconfont icon-iconset0141"></span>
        </div>-->
      </div>
      <div class="right-bottom">
        <div style="display:flex;">
          {{stepperName}}&nbsp;&nbsp;
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
    },
    selected: {
      type: Boolean,
      defalut: false
    },
    index: {
      type: Number,
      defalut: 0
    },
    stepperName: {
      type: String,
      default: '收货数量'
    },
    img: {
      type: String,
      default: ''
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
      this.$emit('input', value, this.index)
    },
    select () {
      this.$emit('changeSel', !this.selected, this.index)
    }
  }
}
</script>
<style lang='less' scoped>
.active {
    color: #4e92ff;
  }
.wuliao {
  border-bottom: 1px solid #f2f2f2;
  padding-right: 15px;
  padding-top: 15px;
  margin-left: 15px;
  display: flex;
  .left-wrapper {
    width: 100px;
    padding-right:20px;
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
            width: 60px;text-align: right;padding-right:4px;
          }
          >div:nth-child(2){
            overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:120px;
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
