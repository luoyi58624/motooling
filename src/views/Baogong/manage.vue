<!--  -->
<template>
  <div>
    <myHeader title="工件管理" :hasRight="true"></myHeader>
    <cube-scroll
      class="scroll"
      ref="scroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div>
        <template slot="pulldown" slot-scope="props">
          <span v-if="props.isPullingDown">正在更新...</span>
          <span v-else>更新成功</span>
          <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper">
            <div class="pulldown-content">
              <img
                src="https://dpubstatic.udache.com/static/dpubimg/7d895941-251f-471f-abc4-3eca25762465.jpg"
              >
              <span v-if="props.beforePullDown">{{pullDownTip}}</span>
              <template v-else>
                <span v-if="props.isPullingDown">正在更新...</span>
                <span v-else>更新成功</span>
              </template>
            </div>
          </div>
        </template>
        <template slot="pullup" >
          下拉加载更多
        </template>
        <div class="input-wrapper">
          <div class>
            <cube-input v-model="value"/>
            <div>确定</div>
          </div>
        </div>
        <div class="nav">
          <div class="active">接收</div>
          <div>转出</div>
        </div>
        <div class="option">
          <div>
            <div>按生产订单排序</div>
            <div>
              降序
              <i class="iconfont">&#xe79e;</i>
            </div>
            <div>
              升序
              <i class="iconfont">&#xe79f;</i>
            </div>
          </div>
          <div>筛选</div>
        </div>
        <div class="list">
          <div class="manager" v-for="item in [1,2,3,4]" :key="item">
            <div class="img-wrapper"></div>
            <div class="info-wrapper">
              <div class="manage-top">
                <p>生产单号：POROIIR</p>
                <p @click="showFix" class="rizhi">日志</p>
              </div>
              <div>物料编码</div>
              <div>上工序</div>
              <div>操作人</div>
              <div>描述</div>
              <div>工序</div>
              <div>操作事件</div>
              <div class="opra">
                <div>1718</div>
                <div>
                  <button>完工</button>
                  <button>返工</button>
                  <button>接收</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="zhezhao" v-show="isShow" @click="hideFix"></div>
        <div class="fixed" v-show="isShow">
          <div style="line-height:50px;text-align:center;font-size:16px;">日志</div>
          <div class="lc">
            <div>
              <div>
                <div>今天</div>
                <div>08:30</div>
              </div>
              <div>
                <div>订单已经创建完成</div>
                <div>操作人：王植阳</div>
              </div>
            </div>
            <div>
              <div>
                <div>今天</div>
                <div>08:30</div>
              </div>
              <div>
                <div>订单已经创建完成</div>
                <div>操作人：王植阳</div>
              </div>
            </div>
            <div>
              <div>
                <div>今天</div>
                <div>08:30</div>
              </div>
              <div>
                <div>订单已经创建完成</div>
                <div>操作人：王植阳</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { Input, Scroll } from "cube-ui";
import myHeader from "@/components/header";
import scroll from "@/components/BScroll";
import { getPartList } from "@/api/baogong/baogong";

export default {
  data() {
    return {
      value: "",
      isShow: false,
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: "更新成功"
        }
      },
      pullDownY: 0,
      pullDownStyle: "",
      opacityStyle: "",
      triggerSurpriseFlag: false,
      triggerSurprise: false
    };
  },
  created() {
    const type = this.$route.query.type;
    const pgId = this.$route.query.pgId;
    getPartList({
      pageNum: 1,
      pageSize: 10,
      type: parseInt(type),
      pgId: parseInt(pgId)
    }).then(res => {
      console.log(res);
    });
  },

  components: {
    myHeader
  },
  methods: {
    onPullingUp() {
      console.log(2);
    },
    onScrollHandle(pos) {
      this.pullDownY = pos.y;
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y}px`;
        this.triggerSurpriseFlag = false;
        if (this.pullDownY > 90) {
          this.triggerSurpriseFlag = true;
        }
      }
      this.$refs.topHeader.style.opacity = this.headerStyle;
    },
    onPullingDown() {
      if (this.triggerSurpriseFlag) {
        this.triggerSurprise = true;
        this.$refs.scroll.forceUpdate();
        return;
      }
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 1000);
    },
    surpriseHandle() {
      this.triggerSurpriseFlag = false;
      this.triggerSurprise = false;
      this.$refs.topHeader.style.opacity = 1;
      // go to other page
    },
    onImgLoad() {
      this.$refs.scroll.refresh();
    },
    showFix() {
      this.isShow = true;
    },
    hideFix() {
      this.isShow = false;
    }
  },
  computed: {
    pullDownTip() {
      if (this.pullDownY <= 60) {
        return "下拉刷新...";
      } else if (this.pullDownY <= 90) {
        return "继续下拉有惊喜...";
      } else {
        return "松手得惊喜！";
      }
    }
  }
};
</script>
<style scoped lang="less">
.scroll {
  position: fixed;
  top: 41px;
  left: 0;
  right: 0;
  bottom: 0;
}
.input-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    height: 30px;
    width: 80%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #c8c8c8;
    > div:first-child {
      flex: 1;
      height: 30px;
      border: 0;
    }
    > div:nth-child(2) {
      width: 50px;
      font-size: 12px;
      color: #fff;
      background: #4e92ff;
      line-height: 30px;
      text-align: center;
    }
  }
}
.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.manager {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.rizhi {
  color: #4e92ff;
}
.manage-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper {
  width: 80px;
}
.info-wrapper {
  font-size: 13px;
  color: #333;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.info-wrapper > div {
  line-height: 25px;
}
.info-wrapper > div:first-child {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}
.info-wrapper > div:first-child > p:first-child {
  font-weight: bold;
  font-size: 14px;
}
.opra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  button {
    width: 50px;
    height: 22px;
    border-radius: 4px;
    background: #eee;
    border: 1px solid rgb(200, 200, 200);
    color: #333;
    margin-right: 15px;
    font-size: 12px;
    line-height: 22px;
  }
  button:last-child {
    margin-right: 0;
  }
}
.lc {
  height: 250px;
  overflow-y: auto;
}
.lc > div {
  display: flex;
  font-size: 14px;
  color: #333;
  align-items: center;
}
.lc > div > div:first-child {
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.lc > div > div:first-child > div:first-child {
  border-right: #4e92ff 1px solid;
  padding-top: 10px;
}
.lc > div > div:first-child > div:nth-child(2) {
  border-right: #4e92ff 1px solid;
  padding-bottom: 10px;
  position: relative;
}
.lc > div:first-child > div:first-child > div:first-child {
  border-right: none;
}
.lc > div:last-child > div:first-child > div:nth-child(2) {
  border-right: none;
}
.lc > div > div:first-child > div:nth-child(2)::after {
  display: block;
  position: absolute;
  width: 14px;
  height: 14px;
  background: #000;
  border-radius: 50%;
  top: -7px;
  right: -7px;
  content: "";
}
.lc > div > div:first-child > div {
  width: 80%;
  text-align: center;
  line-height: 20px;
}
.lc > div > div:nth-child(2) {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 300px;
  z-index: 10;
  background: #fff;
  border-radius: 6px 6px 0 0;
  z-index: 10;
}
.nav {
  height: 40px;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.nav > div {
  flex: 1;
  text-align: center;
}
.nav > div.active {
  color: #4e92ff;
}
.option {
  font-size: 14px;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.option::after {
  display: table;
  content: "";
  clear: both;
}
.option > div:first-child {
  display: flex;
  float: left;
  align-items: center;
}
.option > div:nth-child(2) {
  float: right;
}
.option > div:first-child > div {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
</style>
