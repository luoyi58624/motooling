<!--  -->
<template>
  <div>
    <div class="top">
      <screen :optionList="optionList" @changeA="changeField" @changeB="changeType" @hd="hd">
        <div class="drawer" >
        <div class="box">
          <div class="title">物料类型</div>
          <div class="wrp">
            <div class="bn" v-for="(item,index) in typeList" :key="index" @click="selType(item.matTypeId)" :class="{'sel':selTypeList.includes(item.matTypeId)}">{{item.typeName}}</div>
          </div>
        </div>
        </div>
      </screen>
    </div>

    <cube-scroll
      class="scroll"
      ref="scroll"
      :data="wuliaoList"
      :options="options"
      @pulling-up="onPullingUp"
      @pulling-down="onPullingDown"
    >
    <div class="nocontent" v-show="wuliaoList.length==0">暂无数据</div>
      <div v-for="(item,index) in wuliaoList" :key="index">
        <Materiel
          :info="item"
          v-model="item.value"
          :selected="item.selected"
          :index="index"
          @changeSel="select"
          :img="item.fileList?item.fileList[0].imgUrl:''||require('@/assets/default.png')"
          stepperName="物料数量"
        />
      </div>
      <div class="zw"></div>
    </cube-scroll>
    <div class="bot">
      <cube-button style="background:#5496FF" @click="save">确定</cube-button>
    </div>
  </div>
</template>

<script>
import screen from '../../components/screen'
import Materiel from '../Order/Components/materiel'
import { matList, matTypeList } from '@/api/materiel.js'
export default {
  data () {
    return {
      optionList: [
        { text: '以修改时间排序', value: '1' },
        { text: '以创建时间排序', value: '2' },
        { text: '以物料编码排序', value: '3' }
      ],
      selTypeList: [],
      wuliaoList: [],
      queryValues: '',
      sortType: '2',
      sortField: '1',
      matTypeId: '',
      pageNum: 1,
      pageSize: 10,
      hasMore: true,
      isLoading: false,
      typeList: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '没有更多数据'
          }
        }
      }
    }
  },
  computed: {
    selIdList () {
      return this.$store.state.wuliaoList.map(item => {
        return item.matId
      })
    },
    selWuliaoList () {
      return this.$store.state.wuliaoList
    }
  },
  components: {
    screen,
    Materiel
  },
  created () {
    matTypeList().then(res => {
      this.typeList = res.list
    })
    this.getList()
  },
  methods: {
    save () {
      const list = this.wuliaoList.filter(item => {
        return item.selected
      })
      this.$store.commit('changeWuliaoList', list || [])
      this.$router.go(-1)
    },
    getList () {
      if (this.isLoading || !this.hasMore) {
        return
      }
      this.isLoading = true
      matList({
        // queryValues:this.queryValues,
        sortType: this.sortType,
        sortField: this.sortField,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        matTypeId: this.selTypeList.join(',')
      })
        .then(res => {
          this.$refs.scroll.forceUpdate()
          this.pageNum++
          var list = res.list
          if (list.length < this.pageSize) {
            this.hasMore = false
          }
          this.isLoading = false
          this.wuliaoList = this.wuliaoList.concat(
            list.map(item => {
              return {
                list: [
                  { title: '物料编码', content: item.matNo },
                  { title: '物料描述', content: item.matDesc },
                  { title: '规格型号', content: item.matModel },
                  { title: '仓库', content: item.storeHouseName },
                  { title: '库存数量', content: item.stockQty }
                ],
                max: item.stockQty,
                value: this.selIdList.includes(item.matId) ? this.selWuliaoList[this.selIdList.indexOf(item.matId)]['value'] : 1,
                selected: this.selIdList.includes(item.matId),
                matId: item.matId,
                info: item
              }
            })
          )
        })
        .catch(err => {
          if (err.msg) {
            this.showToast('err.msg')
          }
          this.isLoading = false
        })
    },
    select (value, index) {
      this.wuliaoList[index]['selected'] = value
    },
    changeField (value) {
      this.sortField = value
      this.hasMore = true
      this.pageNum = 1
      this.wuliaoList = []
      this.getList()
    },
    changeType (value) {
      this.sortType = value
      this.pageNum = 1
      this.hasMore = true
      this.wuliaoList = []
      this.getList()
    },
    onPullingUp () {
      console.log(this.pageNum, this.hasMore, this.wuliaoList.length)
      const that = this
      if (that.hasMore) {
        that.getList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    selType (id) {
      console.log(id)
      if (this.selTypeList.includes(id)) {
        this.selTypeList.splice(this.selTypeList.indexOf(id), 1)
      } else {
        this.selTypeList.push(id)
      }
    },
    hd () {
      console.log(this.selTypeList.join(','))
      this.pageNum = 1
      this.hasMore = true
      this.wuliaoList = []
      this.getList()
    },
    onPullingDown () {
      this.pageNum = 1
      this.hasMore = true
      this.wuliaoList = []
      this.getList()
    }
  }
}
</script>
<style lang='less' scoped>
.nocontent{
  font-size:14px;padding:20px;text-align:center;color:#999;
}
.drawer {
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background: #fff;
  width: 320px;
  padding-top: 20px;
  > .box {
    padding: 15px 10px;
    border-bottom: 1px solid #e9e9e9;
    > .title {
      font-size: 15px;
    }
    > .wrp {
      font-size: 14px;
      margin-top: 20px;
      > div {
        display: inline-block;
        width: 40px;
        text-align: center;
        line-height: 40px;
        background: #000;
      }
      > .bn {
        width: 90px;
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        border-radius: 5px;
        text-align: center;
        margin-top: 15px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > .bn:nth-child(3n + 2) {
        margin: 15px 15px 0;
      }
      > .sel {
        background: #5695ff;
        color: #fff;
      }

      > .selTime {
        width: 130px;
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        border-radius: 5px;
        text-align: center;
        margin-top: 15px;
        display: inline-block;
      }
    }
  }
}
.scroll {
  position: fixed;
  top: 41px;
  left: 0;
  right: 0;
  bottom: 0;
}
.zw {
  height: 90px;
}
.bot {
  height: 50px;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
