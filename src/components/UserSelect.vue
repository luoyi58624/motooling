<template>
  <cube-scroll class="scroll" :options="options">
    <div class="_containner" v-show="visible">
      <div
        class="select-box"
        v-for="(listItem, index) in list"
        :key="index"
        @click="show(index)"
      >
        <div class="select-box-header">
          <img src="../../static/img/s4.png" class="icon" />
          <span class="header-text">{{ listItem.name }}</span>

          <img
            src="../../static/img/arrow.png"
            class="arrow icon"
            :class="{ down: listItem.isShow }"
          />
        </div>
        <div class="select-box-list" v-show="listItem.isShow">
          <div
            class="select-box-list-item"
            v-for="(item, index) in listItem.childrenList"
            :key="index"
            @click.stop="pick(item)"
          >
            <span
              class="iconfont icon-iconfontxuanzhong4"
              :class="{
                active: selectedList.some(it => it.uid === item.uid),
                disabled:initSelectedList.some(it => it.uid === item.uid)
              }"
            ></span>
            <img :src="item.avatar" />
            <span class="text">{{ item.username }}</span>
          </div>
        </div>
      </div>
      <div class="mt-30">
        <div @click="confirm" class="btn btn-comfirm">确定</div>
        <div @click="cancel" class="btn btn-cancel">取消</div>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import { depUserList } from '@/api/instore/instore'
export default {
  data () {
    return {
      list: [],
      initSelectedList: [],
      options: {
        mouseWheel: true
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedList () {
      return this.$store.state.userSelectedList
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.initSelectedList = JSON.parse(JSON.stringify(this.$store.state.userSelectedList))
        this.$emit('open')
        this.getList()
      } else {
        this.$emit('close')
      }
    }
  },

  methods: {
    confirm () {
      this.$store.commit('changeUserSelectedList', this.selectedList)
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    },
    getList () {
      depUserList().then(res => {
        const depList = res.list || []
        this.list = depList.map(item => {
          return Object.assign({}, item, { isShow: false })
        })
      })
    },
    show (index) {
      this.list[index].isShow = !this.list[index].isShow
    },

    pick (pickItem) {
      // 如果初始就选中，则不作操作
      if (this.initSelectedList.some(it => it.uid === pickItem.uid)) {
        return
      }
      const index = this.selectedList.findIndex(item => {
        return item.uid === pickItem.uid
      })
      if (index !== -1) {
        this.selectedList.splice(index, 1)
      } else {
        this.selectedList.push(pickItem)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mt-30 {
  margin-top: 20px;
}
.scroll {
  // position: fixed;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;
  background: #fff;
  // z-index: 20;
}
._containner {
  padding: 15px;
}
.select-box {
  overflow: hidden;
  padding: 0 15px;
  font-size: 16px;
  align-items: center;
  box-shadow: 0px 0px 3px 3px #eee;
  border-radius: 4px;
  margin-top: 15px;
  &:first-child {
    margin-top: 0;
  }
  .select-box-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    color: #303030;
    .header-text {
      flex: 1;
    }
    img {
      width: 20px;
      display: block;
      margin-right: 20px;
      display: block;
    }
    .arrow {
      margin-right: 0;
      transform: rotate(-90deg);
      transition: all 0.3s;
    }
    .down {
      transform: rotate(0);
    }
  }

  .select-box-list-item {
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #e9e9e9;
    img {
      width: 40px;
      height: 40px;
      margin-left: 24px;
      margin-right: 24px;
    }
    .iconfont {
      color: #fff;
      font-size: 20px;
      border: solid;
      background-color: #fff;
      border:2px solid #eee;
      border-radius: 50%;
      &.disabled.active{
        color: #eee;
      }
      &.active {
        color: #5495ff;
      }
    }
  }
}

.btn {
  display: block;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  background: #5898fc;
  color: #fff;
  margin: 0 10px 10px;
  border-radius: 6px;
  border: none;
}
.btn-cancel {
  background: #fcfcfc;
  color: #000;
  border: 1px solid #e6e6e6;
}
.btn-confirm {
  background: #5898fc;
}
</style>
