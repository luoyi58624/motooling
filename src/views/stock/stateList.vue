<!--  -->
<template>
  <div class="body">
       <div class="list">
        <div class="manager">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div>库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>

            <div>物料编码:</div>
            <div>物料描述:</div>
            <div>
              <div>库&nbsp;&nbsp;存&nbsp;数:</div>
              <div>实盘</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bot">
          <div :class="{active:state==1}">
              <img src="../../assets/t1.png" alt=""  v-show="state!=1">
               <img src="../../assets/t2.png" alt="" v-show="state==1">
              <div>待盘</div>
          </div>
           <div  :class="{active:state==2}">
               <img src="../../assets/t3.png" alt="" v-show="state!=2">
               <img src="../../assets/t4.png" alt="" v-show="state==2">
              <div>已盘</div>
          </div>
      </div>
  </div>
</template>

<script>
import {getInventoryStatus} from "../../api/stock/stock"
export default {
  data () {
    return {
        state:1
    };
  },

 created(){
   this._getInventoryStatus()
 },

  methods: {
    _getInventoryStatus(){
      getInventoryStatus({}).then(res=>{
        console.log(res)
        
      })
     
    }
    
  }
}

</script>
<style lang='less' scoped>

.body{width: 100%;height: 100%;position: relative;background-color: #767676}

.manager {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;

}

.manage-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper {
  width: 80px;
  margin-right: 10px;
}
.info-wrapper {
  font-size: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    line-height: 25px;
    display: flex;
    justify-content: space-between;
  
  }
  > .state {
    font-size: 14px;
    border: 1px solid #eee;
    margin: 10px 0;
    width: 60px;
    line-height: 30px;
    text-align: center;
    border-radius: 6px;
  }
  > .state1 {
    color: #4b96ff;
    border-color: #4b96ff;
  }
  > .state2 {
    color: #fea14f;
    border-color: #fea14f;
  }
  > .state3 {
    color: #fea14f;
    border-color: #fea14f;
  }
}
.bot{
    display:flex;position:fixed;bottom:0;left:0;right:0;background: #313131;align-items: center;justify-content: space-around;color:#fff;font-size:16px;height:60px;
    >div{
        text-align:center;padding:0 30px;
        >img{
            width:30px;
        }
    }
    >div.active{
        color:#5392F7;

    }
}
</style>