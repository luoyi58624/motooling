<template>
  <div class="in-transit">
    <el-dialog
      :visible.sync="visible"
      width="738px"
      custom-class="transit-dialog"
      :before-close="handleClose"
      >
      <div class="container">
        <div class="truck-info">
          <ul >
            <li @click="chooseDriver(1)"><img :src="require('@/assets/driver1.png')"></li>
            <li @click="chooseDriver(2)"><img :src="require('@/assets/driver2.png')"></li>
          </ul>
          <div class="driver-truck">
            <div class="driver">
              <img :src="require('@/assets/driver1.png')" v-if="truckInfo.id === 1" @click="startChat('老李')">
              <img :src="require('@/assets/driver2.png')" v-else @click="startChat('张达')">
              <p>驾驶员：{{truckInfo.driver}}</p>
              <p>性别：{{truckInfo.sex}}</p>
              <p>年龄：{{truckInfo.age}}</p>
              <p>驾龄：{{truckInfo.drivingYears}}</p>
              <p>驾照类型：{{truckInfo.licenseType}}</p>
              <p>电话：{{truckInfo.tel}}</p>
            </div>
            <div class="truck">
              <img :src="require('@/assets/truck.png')" alt="">
              <p>车牌号：{{truckInfo.carNum}}</p>
              <p>类型：{{truckInfo.type}}</p>
              <p>规格：{{truckInfo.spec}}</p>
              <p>容积：{{truckInfo.volume}}</p>
              <p>核定载量：{{truckInfo.load}}</p>
              <p>车队：{{truckInfo.truckingCom}}</p>
            </div>
          </div>
          <div class="route">
            <p>始发地：{{truckInfo.startPosition}}</p>
            <p>目的地：{{truckInfo.destination}}</p>
            <p>当前位置：{{truckInfo.currentPosition}}</p>
            <p>{{truckInfo.arriveTime}}</p>
          </div>
        </div>
        <div class="goods-box">
          <div class="goods-info-box">
            <div class="goods-info" v-for="(item,index) in goods" :key="index">
              <img :src="item.image" alt="">
              <div class="desc">
                <div class="desc-material">
                  <p>物料描述：{{item.desc}}</p>
                  <p>数量：{{item.amount}}</p>
                </div>
                <div class="desc-amount">
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
      </div>
      </el-dialog>
      <el-dialog
        :visible.sync="chatVisible"
        width="500px"
        :before-close="chatEnd">
        <div style="height:600px">
          <chat :userId="userId" :talkMember="talkMember" />
        </div>
      </el-dialog>
  </div>
</template>

<script>
import Logistics from '@/api/logistics'
import chat from '@/views/synergy/chat/layout'
export default {
  components: { chat },
  props: {
    truckId: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      truckInfo: {},
      amountGoods: [],
      userId: 0,
      goods: [],
      route: null,
      page: 0,
      talkMember: '',
      visible: false,
      chatVisible: false
    }
  },
  mounted () {
    const logistic = new Logistics(this.truckId)
    this.truckInfo = logistic.carCargo()
    this.goods = [
      {
        'image': 'http://dummyimage.com/200x100/FF6600',
        'desc': '无线充电器',
        'type': 'IBYIWSID',
        'amount': 665,
        'weight': '980KG'
      },
      {
        'image': 'http://dummyimage.com/200x100/FF6600',
        'desc': '移动电源',
        'type': 'RYLPTBWZ',
        'amount': 737,
        'weight': '980KG'
      },
      {
        'image': 'http://dummyimage.com/200x100/FF6600',
        'desc': '自行车前灯',
        'type': 'QRCWRTDQ',
        'amount': 872,
        'weight': '980KG'
      },
      {
        'image': 'http://dummyimage.com/200x100/FF6600',
        'desc': '毛绒玩具',
        'type': 'QRCWRTDQ',
        'amount': 872,
        'weight': '980KG'
      }
    ]
  },
  methods: {
    init () {
      this.visible = true
    },
    handleClose () {
      this.$emit('update-visible', false)
      this.visible = false
    },
    pageChange (currentPage) {
      if (currentPage === 1) {
        this.goods = this.amountGoods.slice(0, 6)
      } else {
        this.goods = this.amountGoods.slice(6)
      }
    },
    chooseDriver (id) {
      const logistic = new Logistics(id)
      this.truckInfo = logistic.carCargo()
    },
    startChat (name) {
      this.chatVisible = true
      this.talkMember = name
    },
    chatEnd () {
      this.chatVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  .truck-info {
    width:40%;
    margin-right: 10px;
    ul{
        overflow: hidden;
        border-bottom: 2px solid rgb(213, 214, 217);
        padding-bottom: 10px;
      li {
        float: left;
        margin: 0 4px;
        img {
          width: 60px;
          height: 50px;
          object-fit: fill;
        }
      }
    }
    .driver-truck {
      overflow: hidden;
      border-bottom: 2px solid rgb(213, 214, 217);
      margin: 12px 0;
      padding-bottom: 5px;
      color: rgb(213, 214, 217);
      font-size: 12px;
      .driver,.truck {
        float: left;
      }
      .driver {
        margin-right: 40px;
        img {
          height: 88px;
          width: 112px;
        }
      }
      p {
        line-height: 15px;
      }
    }
    .route {
      line-height: 15px;
      color: rgb(213, 214, 217);
      font-size: 12px;
    }
  }
  .goods-box {
    width: 58%;
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
      p {
        line-height: 20px;
      }
      .desc-material {
        width: 42%;
      }
      .desc-amount {
        width: 48%;
      }
    }
  }
}

/deep/ .transit-dialog {
  background-color: rgb(42, 49, 59);
}
</style>
