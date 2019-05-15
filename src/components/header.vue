
<template>
  <div class="header">
    <div class="bg" v-show="isShowList" @click="hideList"></div>
    <div class="header-wrapper">
      <div class="left" @click="back"><span class="iconfont icon-fanhui"></span></div>
      <div class="center" @click="showList">{{title}}
        <span v-show="list.length>0" class="iconfont icon-xiangxia"></span>
      </div>
      <div class="right" v-show="hasRight">
         <router-link :to="settingUrl"><span class="iconfont icon-gengduo"></span></router-link>
      </div>
    </div>
      <slide-up-down :active="isShowList" :duration="300" class="list" >
        <div v-for="(item,index) in list" :key="item.pgId" @click="select(item.pgId,index,item.workShopList)" :class="{active:index==selIdx}">
          <div>{{item.pgName}}</div>
        </div>
      </slide-up-down>

  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
  data () {
    return {
      isShowList: false
    }
  },
  props: {
    title: {
      type: String,
      default () {
        return '标题'
      }
    },
    settingUrl: {
      type: String,
      default () {
        return '/baogong/setting'
      }
    },
    selIdx: {
      type: Number,
      default () {
        return 0
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    hasRight: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  components: {
    SlideUpDown
  },

  computed: {},

  methods: {
    showList () {
      console.log(this.list)
      if (this.list && this.list.length > 0) {
        this.isShowList = !this.isShowList
      }
    },
    select (pgId, index, workShopList) {
      this.isShowList = false
      this.pgId = pgId
      if (this.pgId == 0) {
        var newArray = []
        for (let i = 0; i < workShopList.length; i++) {
          newArray.push({ value: workShopList[i].id, text: workShopList[i].workshopName })
        }
        this.$emit('workshop', newArray)
      } else {
        this.$emit('select', pgId, index)
      }
    },
    hideList () {
      this.isShowList = false
    },
    back () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang='less' scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 0 15px;
  height: 40px;
  font-size: 18px;
  color: #333;
  z-index: 2;
  border-bottom: 1px solid #eee;
  > .header-wrapper {
    z-index: 4;

    position: relative;
    height: 40px;
    line-height:40px;
    align-items: center;
    >.left{
      float:left;
    }
    >.right{
      float:right;
    }
    >.center{
      position:absolute;left:50%;transform: translate(-50%,0);height:40px;top:0;line-height:40px;
    }
  }
  > .list {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 100%);
    bottom: 0;
    color: #505050;
    width: 130px;
    text-align: center;
    background: #fff;
    border-radius: 0 0 8px 8px;
    z-index: 4;
    > div {
      height: 30px;
      line-height: 30px;
    }
  }
  .bg {
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }
}
.active{
  color:#4e92ff
}
</style>
