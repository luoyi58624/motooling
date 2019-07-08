<!--  -->
<template>
  <div>
    <div class="title">收货信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>生产订单</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>收发货单编号</div>
          <div>{{}}</div>
        </div>

      </div>
    </div>
    <div class="title">收货物料</div>
    <div class="content">
      <div class="list">
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
                <van-stepper min="5" max="8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计</div>
      <div>收货</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang='less' scoped>
.title {
  padding: 14px;
  font-size: 12px;
  background: #f8f9fd;
  color: #cacacc;
}
.content {
  padding: 14px;
}

.table {
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  color: #b0b0b0;
  > div {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid #d8d8d8;
    > div {
      padding: 5px;
    }
    > div:first-child {
      width: 100px;
      border-right: 1px solid #d8d8d8;
    }
  }
  > div:last-child {
    border-bottom: none;
  }
}
.list {
  .wuliao {
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
}
.bz {
  border: 1px solid #D4D4D4;
  border-radius: 5px;
  font-size:14px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  padding: 10px;
  resize: none;
}
.bot{
  position:fixed;bottom:0;left:0;right:0;height:50px;/*no*/border-top:1px solid #F3F3F3;/*no*/display:flex;background: #fff;font-size:14px;/*no*/margin-top:50px;
  >div{
    flex:1;text-align:center;line-height:50px;/*no*/
  }
  >div:last-child{
    background: #5FD858;color:#fff;
  }
}
.zw{
  height:50px;/*no*/
}
</style>
