<template>
  <div class="cargo-load">
    <div class="driver-car-box">
      <div class="driver-car">
        <div class="driver">
          <img :src="require('@/assets/driver2.png')" @click="startChat('张达')">
          <p>驾驶员:张达</p>
          <img :src="require('@/assets/loadVolumn.png')" alt="">
          <p>当前载货重量</p>
        </div>
      <div class="car">
        <img :src="require('@/assets/truck.png')" alt="">
        <p>车辆：粤B2084</p>
        <img :src="require('@/assets/loadVolumn.png')" alt="">
        <p>当前载货容积</p>
      </div>
    </div>
    <p>发往：广东省深圳市龙华大道109号</p>
    <p>距离：591 KM</p>
    <p>计划发车时间：2021-02-05 08:30</p>
    <p>预计到达时间：2021-02-05 22:10</p>
    </div>
    <div class="goods-box">
      <div class="goods-info-box">
        <div class="goods-info" v-for="(item,index) in goods" :key="index">
          <img :src="item.image" alt="">
          <div class="desc">
            <div class="desc-line">
              <p>物料描述：{{item.desc}}</p>
              <p>数量：{{item.amount}}</p>
            </div>
            <div class="desc-line">
              <p>规格型号：{{item.type}}</p>
              <p>总量：{{item.weight}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :page-size="6"
          :total="amountGoods.length"
          @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog
    :visible.sync="visible"
    width="500px"
    top="0"
    custom-class="transit-dialog"
    :before-close="handleClose">
    <div style="height:500px">
      <chat :talkMember="talkMember" />
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { transit } from '@/api/logistics'
import chat from '@/views/synergy/chat/chatPanel'
export default {
  components: { chat },
  data () {
    return {
      goods: [],
      amountGoods: [],
      chargers: [{ memberName: '张达' }],
      talkMember: '',
      visible: false
    }
  },
  mounted () {
    transit(2).then(res => {
      this.amountGoods = res.goods
      this.goods = res.goods.slice(0, 6)
    })
  },
  methods: {
    pageChange (currentPage) {
      if (currentPage === 1) {
        this.goods = this.amountGoods.slice(0, 6)
      } else {
        this.goods = this.amountGoods.slice(6)
      }
    },
    startChat (member) {
      this.visible = true
      this.talkMember = member
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
.cargo-load {
  display: flex;
  justify-content: space-between;
  color:  rgb(213, 214, 217);
  height: 100vh;
  box-sizing: border-box;
  padding: 20px 0 0 20px;
  background-color: rgb(42, 49, 59);
  .driver-car-box {
    .driver-car {
      display: flex;
      margin-bottom: 20px;
      .driver {
        margin-right: 30px;
      }
      p {
        line-height: 2;
        text-align: center;
      }
    }
    & > p {
      line-height: 1.5;
    }
  }
}
  .goods-box {
    width: 58%;
    margin-right: 20px;
    position: relative;
    .goods-info-box {
    background-color: rgb(215, 215, 215);
    padding: 0 8px;
    border-radius: 5px;
    overflow: hidden;
    }
    .pagination {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .goods-info {
    height: 40px;
    border-radius: 5px;
    display: flex;
    color: rgb(44, 44, 44);
    font-size: 13px;
    background-color: #fff;
    padding: 5px 0;
    margin: 5px 0;
    img {
      width: 60px;
      height: 40px;
      margin-left: 5px;
      object-fit: scale-down;
    }
    .desc {
      width: calc(100% - 60px);
      display: flex;
      justify-content: space-around;
      .desc-line {
        p {
          line-height: 20px;
        }
      }
    }
  }
</style>
