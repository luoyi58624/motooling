<!--  -->
<template>
      <div class="wuliao">
          <div class="left-wrapper">
            <img src alt />
          </div>
          <div class="right-wrapper">
            <div class="right-top">
              <div class="right-top-left">
                <div class="info-bar">
                  <div>物料编码:</div>
                  <div>M1232414-34</div>
                </div>
                <div class="info-bar">
                  <div>物料描述:</div>
                  <div>M1232414-34</div>
                </div>
                <div class="info-bar">
                  <div>物料类型:</div>
                  <div>M1232414-34</div>
                </div>
                <div class="info-bar">
                  <div>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</div>
                  <div>M1232414-34</div>
                </div>
                <div class="info-bar">
                  <div>代收数量:</div>
                  <div>M1232414-34</div>
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
              <stepper/>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import stepper from './stepper'
export default {
  data () {
    return {
    }
  },
  props: {

  },
  components: {
    stepper
  }
}

</script>
<style lang='less' scoped>
  .wuliao {
      border-bottom:1px solid #F2F2F2;padding-right:15px;padding-top:15px;margin-left:15px;
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
