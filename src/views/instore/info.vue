<!--  -->
<template>
  <div>
    <div class="title">采购信息</div>
    <div class="wrapper first-banner">
      <div>采购单号：</div>
      <div>物料单号：</div>

      <div>物料名称</div>
      <div>规格型号</div>
      <div>
        <div>采购数量</div>
        <div>采购重量：</div>
      </div>
      <div>
        <div>采购单价：</div>
        <div>采购金额：</div>
      </div>
      <div>
        <div>发送日期：</div>
        <div>交货金额：</div>
      </div>
      <div>备注：</div>
    </div>
    <div class="title">收货信息</div>
    <div class="wrapper second-banner">
      <div>
        <div>
          收货数量
          <input type="text" name id>
        </div>
        <div>
          收货重量
          <input type="text" name id>
        </div>
      </div>
      <div>
        <div>
          收货单价
          <input type="text" name id>
        </div>
        <div>
          收货金额
          <input type="text" name id>
        </div>
      </div>
      <div>
        <div>
          收货仓库
          <cube-select class="select" v-model="value" :options="options"></cube-select>
        </div>
      </div>
      <div>
        <div>收货库位
             <cube-select class="select" v-model="value" :options="options"></cube-select>
        </div>
         
      </div>
      <div >
        <div class="txt">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea name="" id="" ></textarea>
        </div>
      </div>
    </div>
    <div class="title">
        <div>质检信息</div>
        <div>验证标准</div>
    </div>
    <div class="wrapper second-banner">
      <div>
        <div>
          检验方式
          <div></div>
          
        </div>
      </div>
      <div>
        <div>
          合格数量
          <input type="text" name id>
        </div>
        <div>
          不良数量
          <input type="text" name id>
        </div>
      </div>
      <div>
        <div>
          不良原因
          <cube-select class="select" v-model="value" :options="options"></cube-select>
        </div>
      </div>
      <div >
        <div class="txt">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea name="" id="" ></textarea>
        </div>
      </div>
    </div>
        <div class="title">特采信息</div>
         <div class="wrapper second-banner">
      <div>
        <div>
          特采数量
          <input type="text" name id>
        </div>
        <div>
          特采单价
          <input type="text" name id>
        </div>
      </div>
      <div>
        <div>
          降价比例
          <input type="text" name id>
          %
        </div>
       
      </div>
   
      <div >
        <div class="txt">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea name="" id="" ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPartList ,setPart,getPartProcessLog,setPartPraise} from "@/api/baogong/baogong";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style lang='less' scoped>
.title {
  background: #f8f9fe;
  color: #505050;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 14px;
  display:flex;
  justify-content: space-between;
  >div:nth-child(2){
      font-size:12px;color:#5495FF;
  }
  }
.wrapper {
  padding: 10px 20px;
}
.first-banner {
  > div {
    font-size: 14px;
    line-height: 25px;
    display: flex;
    > div {
      flex: 1;
    }
  }
}
.second-banner {
  > div {
    display: flex;
    > div {
      flex: 1;
      font-size: 14px;
      display: flex;
      height: 40px;
      align-items: center;
      > input {
        width: 90px;
        background: #f2f5fa;
        height: 30px;
        margin-left: 12px;
        border-radius: 4px;
      }
      >.select{
          height:30px;padding:0; margin-left: 12px;border-radius: 4px; background: #f2f5fa;flex:1;border:0;line-height:30px;padding:0 20px;
      }
      >.select::after{
          border:0;
      }
      >textarea{
            height:60px;padding:0; margin-left: 12px;border-radius: 4px; background: #f2f5fa;flex:1;border:0;line-height:20px;
      }
     
    }
    >div.txt{
        height: 70px;
    }
  }
}
</style>