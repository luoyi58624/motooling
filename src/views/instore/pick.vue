<!-- 选择公司，供应商等 -->
<template>
  <cube-scroll class="scroll">
    <div class="_containner">
      <div class="select-box" v-for="(it,idx) in list" :key="idx" @click="show(idx)">
        <div class="box">
          <div>
            <img src="../../../static/img/s4.png" alt>
            <!-- <img :src="it.depPic" alt=""> -->
            {{it.name}}
          </div>
          <div>
            <img src="../../../static/img/arrow.png" class="arrow" alt :class="{down:it.showList}">
          </div>
        </div>
        <div class="list" v-show="it.showList">
          <div v-for="(item,index) in it.childrenList" :key="index" @click.stop="pick(item)">
            <div>
              <span
                class="iconfont icon-iconfontxuanzhong4"
                :class="{active:uidList.includes(item.uid)}"
              ></span>
            </div>
            <div>
              <img :src="item.avatar" alt>
            </div>
            <div>{{item.username}}</div>
          </div>
        </div>
      </div>
    </div>
    <div @click="save()" class="confirm-btn">
      确定
    </div>
  </cube-scroll>
</template>

<script>
import { depUserList } from '@/api/instore/instore'
var type
var name
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    type = this.$route.query.type
    name = this.$route.query.name
    console.log(this.$store.state[name])
    this.getList()
  },
  computed: {
    selectedList () {
      return this.$store.state[name]
    },
    uidList () {
      const arr = this.selectedList.map(item => {
        return item.uid
      })
      const a = arr || []
      return a
    }
  },

  components: {},

  methods: {
    getList () {
      // console.log(depUserList)
      depUserList().then(res => {
        const depList = res.list || []
        console.log(depList)
        this.list = depList.map(item => {
          return Object.assign({}, item, { showList: false })
        })
      })
    },
    show (index) {
      console.log(index)
      this.list = [
        ...this.list.slice(0, index),
        Object.assign({}, this.list[index], {
          showList: !this.list[index].showList
        }),
        ...this.list.slice(index + 1)
      ]
      console.log(this.list[index])
      // this.list[index].showList = !this.list[index].showList
    },
    pick (item) {
      console.log(this.uidList)
      var selectedList = this.$store.state[name]
      const uid = item.uid
      if (this.uidList.includes(uid)) {
        for (var i = 0; i < selectedList.length; i++) {
          if (selectedList[i].uid === uid) {
            selectedList = [
              ...selectedList.slice(0, i),
              ...selectedList.slice(i + 1)
            ]
          }
        }
      } else {
        selectedList.push(item)
      }
      this.$store.commit(type, selectedList)
    },
    save () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less' scoped>
body {
  background: rgb(248, 249, 254);
}
.scroll {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 20;
}
._containner {
  padding: 15px;
  .select-box {
    overflow: hidden;
    padding: 0 15px;
    font-size: 16px;
    align-items: center;

    box-shadow: 0px 0px 3px 3px #eee;
    border-radius: 4px;
    margin-top: 15px;
    > div.box {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      > div {
        display: flex;
        align-items: center;
        color: #303030;
        > img {
          width: 20px;
          display: block;
          margin-right: 20px;
          display: block;
        }
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
    > div.list {
      > div {
        display: flex;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid #e9e9e9;
        > div:first-child {
          > span {
            color: #eee;
            font-size: 20px;
          }
          > span.active {
            color: #5495ff;
          }
        }
        > div:nth-child(2) {
          > img {
            width: 40px;
            height: 40px;
            display: block;
            margin-left: 24px;
          }
        }
        > div:nth-child(3) {
          margin-left: 24px;
        }
      }
    }
  }
  .select-box:first-child {
    margin-top: 0;
  }
}
.confirm-btn{
  display: block;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  background: #5898FC;
  color: #fff;
  margin: 0 10px 10px;
  border-radius: 6px;
}
</style>
