<!--  -->
<template>
  <div>
    <myHeader title="工件管理" :hasRight="true"></myHeader>
    <cube-scroll
      class="scroll"
      ref="scroll"
      :data="list"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
    
      <div>
        <template slot="pulldown" slot-scope="props">
          <span v-if="props.isPullingDown"  style="font-size:12px;">正在更新...</span>
          <span v-else  style="font-size:12px;">更新成功</span>
          <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper">
            <div class="pulldown-content">
              <img
                src="https://dpubstatic.udache.com/static/dpubimg/7d895941-251f-471f-abc4-3eca25762465.jpg"
              >
              <span v-if="props.beforePullDown">{{pullDownTip}}</span>
              <template v-else>
                <span v-if="props.isPullingDown" style="font-size:12px;">正在更新...</span>
                <span v-else style="font-size:12px;">更新成功</span>
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
            <div  @click="()=>{this.showToast('功能暂未开发')}">确定</div>
          </div>
        </div>

        <div class="nav">
          <div :class="{active:type==1}" @click="changeType(1)">接收</div>
          <div :class="{active:type==2}"  @click="changeType(2)">转出</div>
        </div>
        <div class="option">
          <div>
            <div style="color:#4e92ff">按生产订单排序</div>
            <div :class="{active:sort=='1'}" @click="reverse(1)">
              升序
              <i class="iconfont">&#xe79e;</i>
            </div>
            <div :class="{active:sort=='2'}" @click="reverse(2)">
              降序
              <i class="iconfont">&#xe79f;</i>
            </div>
          </div>
          <div @click="()=>{this.showToast('功能暂未开发')}">筛选</div>
        </div>
        <div v-if="list.length==0&&!hasMore" class="nocontent">暂无工件</div>
        <div class="list">
          <div class="manager" v-for="(item,index) in list" :key="index">
            <div class="img-wrapper">
              <img :src="item.imgUrl" alt="" class="gjimg">
            </div>
            <div class="info-wrapper">
              <div class="manage-top">
                <p>生产单号：{{item.poNo}}</p>
                <p @click="showFix(item.poId,item.popId)" class="rizhi">日志</p>
              </div>
              <div>物料编码:{{item.matNo}}</div>
              <div>上工序:{{item.matName}}</div>
              <div>操作人:{{item.prevWorkerName}}</div>
              <div>描述:{{item.procDesc}}</div>
              <div>工序:{{item.procSeq}}</div>
              <div>操作时间：{{item.prevHandleTime}}</div>
              <div class="opra">
                <div v-if="item.prevBatchProcId" @click="like(item.prevBatchProcId,item.prevPopId,item.prevPraiseCount,index)"><span class="iconfont icon-dianzan1"></span>  {{item.prevPraiseCount||0}}</div>
               <div></div>
                <div>
                  <button v-show="type==2" @click="zhuanchu(2,item.popId,item.batchProcId)">转出</button>
                  <button  v-show="type==1" @click="jieshou(1,item.popId)">接收</button>
                   <button v-if="item.prevBatchProcId&&item.prevPopId" v-show="type==1" @click="fangong(3,item.popId,item.prevBatchProcId,item.prevPopId)">返工</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
            <div class="zhezhao" v-show="isShow" @click="hideFix"></div>
        <div class="fixed" v-show="isShow">
          <div style="line-height:50px;text-align:center;font-size:16px;">日志</div>
          <div class="lc">
            <div v-for="(item,index) in rzList" :key="index">
              <div>

                <div>{{item.handleTime?item.handleTime.substring(5,10):''}}</div>
                <div>{{item.handleTime?item.handleTime.substring(11,16):''}}</div>
              </div>
              <div>
                <div>{{item.handleDesc}}</div>
                <div>{{item.handlerName}}</div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { Input, Scroll } from 'cube-ui'
import myHeader from '@/components/header'
import scroll from '@/components/BScroll'
import { getPartList, setPart, getPartProcessLog, setPartPraise } from '@/api/baogong/baogong'

export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 10,
      hasMore: true,
      done: true,
      value: '',
      list: [],
      type: '',
      isShow: false,
      sort: 1,
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '没有了'
          }
        }
      },
      pullDownY: 0,
      pullDownStyle: '',
      opacityStyle: '',
      triggerSurpriseFlag: false,
      triggerSurprise: false,
      rzList: []// 日志列表
    }
  },
  created () {
    this._getPartList()
  },

  components: {
    myHeader
  },
  methods: {
    reverse (sort) {
      this.sort = sort
      this.list = []
      this.done = true
      this.hasMore = true
      this._getPartList()
      // this._getPartList()
    },
    showToast (val) {
      const toast = this.$createToast({
        type: 'txt',
        txt: val
      })
      toast.show()
    },
    like (prevBatchProcId, prevPopId, prevPraiseCount, index) {
      setPartPraise({ prevBatchProcId, prevPopId }).then(res => {
        this.list[index].prevPraiseCount = this.list[index].prevPraiseCount + 1
      })
    },
    jieshou (type, popId) {
      setPart({ type, popId }).then(res => {
        console.log(res)
        this.list = []
        this.done = true
        this.hasMore = true
        this._getPartList()
        this.showToast('接收成功')
      }).catch(err => {
        if (err.msg) {
          this.showToast(err.msg)
        }
      })
    },
    fangong (type, popId, prevBatchProcId, prevPopId) {
      setPart({ type, popId, prevBatchProcId, prevPopId }).then(res => {
        console.log(res)
        this.list = []
        this.done = true
        this.hasMore = true
        this._getPartList()
        this.showToast('返工成功')
      }).catch(err => {
        if (err.msg) {
          this.showToast(err.msg)
        }
      })
    },
    zhuanchu (type, popId, batchProcId) {
      setPart({ type, popId, batchProcId }).then(res => {
        this.list = []
        this.done = true
        this.hasMore = true
        this._getPartList()
        this.showToast('转出成功')
        console.log(res)
      }).catch(err => {
        if (err.msg) {
          this.showToast(err.msg)
        }
      })
    },
    changeType (type) {
      this.type = type
      this.list = []
      this.done = true
      this.hasMore = true
      this._getPartList()
    },
    _getPartList () {
      const that = this
      const type = this.type || this.$route.query.type
      this.type = type
      // console.log(type)
      const pgId = this.$route.query.pgId
      if (that.done && that.hasMore) {
        that.done = false
        that.hasMore = false
        getPartList({
          sort: that.sort,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          type,
          pgId
        }).then(res => {
          that.$refs.scroll.forceUpdate()
          that.list = [...that.list, ...res.list]
          that.done = true
          if (res.list.length == that.pageSize) {
            that.hasMore = true
            that.pageNum++
          } else {
            that.hasMore = false
          }
        }).catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
      }
    },
    onPullingUp () {
      console.log(this.hasMore)
      const that = this
      if (that.hasMore) {
        that._getPartList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    //    setTimeout(() => {
    //   if (Math.random() > 0.5) {
    //     // 如果有新数据
    //     //let newPage = _foods.slice(0, 5)
    //     //this.items = this.items.concat(newPage)
    //     console.log('更新了')
    //      this.$refs.scroll.forceUpdate()
    //   } else {
    //     // 如果没有新数据
    //     this.$refs.scroll.forceUpdate()
    //   }
    // }, 1000)
    },
    onScrollHandle (pos) {
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y}px`
        this.triggerSurpriseFlag = false
        if (this.pullDownY > 90) {
          this.triggerSurpriseFlag = true
        }
      }
      this.$refs.topHeader.style.opacity = this.headerStyle
    },
    onPullingDown () {
      // if (this.triggerSurpriseFlag) {
      //   this.triggerSurprise = true;
      //   this.$refs.scroll.forceUpdate();
      //   return;
      // }\
      this.list = []
      this.hasMore = true
      this.pageNum = 1
      this._getPartList()
    },
    surpriseHandle () {
      this.triggerSurpriseFlag = false
      this.triggerSurprise = false
      this.$refs.topHeader.style.opacity = 1
      // go to other page
    },
    onImgLoad () {
      this.$refs.scroll.refresh()
    },
    showFix (poId, popId) {
      this.rzList = true
      this.isShow = true
      getPartProcessLog({ poId, popId }).then(res => {
        this.rzList = res.list
      })
    },
    hideFix () {
      this.isShow = false
    }
  },
  computed: {
    pullDownTip () {
      if (this.pullDownY <= 60) {
        return '下拉刷新...'
      } else if (this.pullDownY <= 90) {
        return '继续下拉有惊喜...'
      } else {
        return '松手得惊喜！'
      }
    }
  }
}
</script>
<style scoped lang="less">
.nocontent{
   font-size:16px;color:#999;text-align:center;padding:20px 0;
}
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
  font-size:14px;
}
.manage-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper {
  width: 80px;margin-right:10px;
}
.info-wrapper {
  font-size: 13px;
  color: #333;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.info-wrapper > div {
  line-height: 22px;
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
  max-height: 250px;
  overflow-y: auto;
}
.lc > div {
  display: flex;
  font-size: 14px;
  color: #333;
  align-items: center;
}
.lc > div > div:first-child {
  width: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.lc > div > div:first-child > div:first-child {
  border-right: #4e92ff 2px solid;
  padding-top: 10px;
}
.lc > div > div:first-child > div:nth-child(2) {
  border-right: #4e92ff 2px solid;
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
  background: #4e92ff;
  border-radius: 50%;
  top: -7px;
  right: -8px;
  content: "";
}
.lc > div > div:first-child > div {
  width: 80%;
  text-align: center;
  line-height: 20px;
}
.lc > div > div:nth-child(2) {
  display: flex;
  justify-content: space-between;padding:0 15px 0 10px;
  flex: 1;
}
.fixed {
  transition: transfrom 1s;
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
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
  position:sticky;
  top:40px;left:0;right:0;
  .active{
    color: #4e92ff;
  }
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
.gjimg{
  width:100%;display:block;margin-top:6px;
}
.cube-pulldown-loaded>span{
  font-size:12px !important;
}
</style>
