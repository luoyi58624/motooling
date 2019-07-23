<!--  -->
<template>
  <div>
    <div class="top">
      <screen :optionList="optionList" @changeA="changeField" @changeB="changeType" />
    </div>
    <cube-scroll
      class="scroll"
      ref="scroll"
      :data="wuliaoList"
      :options="options"
      @pulling-up="onPullingUp"
      @pulling-down="onPullingDown"
    >
      <div v-for="(item,index) in wuliaoList" :key="index">
        <Materiel
          :info="item"
          v-model="item.value"
          :selected="item.selected"
          :index="index"
          @changeSel="select"
        />
      </div>
      <div class="zw"></div>
    </cube-scroll>
    <div class="bot">
      <cube-button style="background:#5496FF">确定</cube-button>
    </div>
  </div>
</template>

<script>
import screen from '../../components/screen'
import Materiel from '../Order/Components/materiel'
import { matList } from '@/api/materiel.js'
export default {
  data () {
    return {
      optionList: [
        { text: '以修改时间排序', value: '1' },
        { text: '以创建时间排序', value: '2' },
        { text: '以物料编码排序', value: '3' }
      ],
      wuliaoList: [],
      queryValues: '',
      sortType: '2',
      sortField: '1',
      matTypeId: '',
      pageNum: 1,
      pageSize: 10,
      hasMore: true,
      isLoading: false,
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
  components: {
    screen,
    Materiel
  },
  created () {
    this.getList()
  },
  methods: {
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
        pageSize: this.pageSize
        // matTypeId:this.matTypeId
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
                  { title: '物料描述', content: item.matName },
                  { title: '规格型号', content: item.matModel },
                  { title: '仓库', content: item.storeHouseName },
                  { title: '库存数量', content: item.stockQty }
                ],
                max: item.stockQty,
                value: 1,
                selected: false
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
