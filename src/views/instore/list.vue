<!--  -->
<template>
  <div>
    <my-header title="采购收货"></my-header>  
    <div class="option">
      <div>
        <div style="color:#4e92ff">按生产订单排序</div>
        <div :class="{active:true}" >
          升序
          <i class="iconfont">&#xe79e;</i>
        </div>
        <div :class="{active:false}">
          降序
          <i class="iconfont">&#xe79f;</i>
        </div>
      </div>
      <div @click="()=>{this.showToast('功能暂未开发')}">筛选</div>
    </div>
    <div class="no">
       <div>PO201807001（深圳聚能）</div>
       <div @click.stop="selectAll">  <span class="iconfont icon-iconfontxuanzhong4" :class="{active:selecteAll}"></span></div>
    </div>
    <div class="list">
      <div class="boxer" v-for="(item,index) in list" :key="index" @click="toInfo(item.purchSubId)">
        <div class="img-wrapper">
          <img src alt>
        </div>
        <div class="center-wrapper">
          <div class="title">名称:</div>
          <div>物料编码：{{item.matNo}}</div>
          <div>规格型号：{{item.matModel}}</div>
          
          <div>数量：{{item.quantity}}</div>
          <div>重量：{{item.a}}</div>
          <div>检验要求:{{item.pcFlag}}</div>
          <div class="btn-wrapper">
            <div class="active">质检</div>
            <div>特采</div>
          </div>
        </div>
        <div class="right-wrapper"  @click.stop="select(index)">
          <span class="iconfont icon-iconfontxuanzhong4" :class="{active:item.selected}"></span>
        </div>
      </div>
    </div>
    <div class="footer">
        <div>
            <div>服务</div>
            <div>企业圈</div>
        </div>
        <div>
            <div>收货</div>
            <div>检验</div>
            <div>特采</div>
        </div>
        
    </div>
    <div class="zw"></div>
  </div>
</template>

<script>
import { inStoreList} from "@/api/instore/instore";
import router from "../../router";
import myHeader from "@/components/header";
export default {
   components: {
      myHeader
  },
  data() {
    return {
        list:[]
    };
  },
  created(){
     this.getList()
     
  },
  computed:{
       selecteAll(){
      return this.list.every(item=>{
        return item.selected===true
      })

    }

  },


  methods: {
    selectAll(){
      if(this.selecteAll){
        this.list=this.list.map((item,index)=>{
          return Object.assign({},item,{selected:false})
        })
      }else{
        this.list=this.list.map((item,index)=>{
          return Object.assign({},item,{selected:true})
        })
      }

    },
      getList(){
           inStoreList({billNo:"MP19040001"}).then(res=>{
             let array=res.inStoreDetailList
             for(let i=0;i<array.length;i++){
               array[i].selected=true
             }
               this.list=array
      })
      },
      toInfo(purchSubId){
      //onsole.log(purchId)
        this.$router.push({
        path: "/instore/info",
        query: {
          purchSubId,
          type:1
        }
      });
      },
      select(index){
        this.list=[...this.list.slice(0,index),Object.assign({},this.list[index],{selected:!this.list[index].selected}),...this.list.slice(index+1)]
        //this.selecteAll=false;

      }
  }
};
</script>
<style lang='less' scoped>
.zw{
    height:51px;
}
.option {
  margin-top:41px;
    background: #fff;
  font-size: 14px;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  .active {
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
.no{
    height:40px;display:flex;justify-content: space-between;padding:0 6px 0 15px;border-bottom:1px solid #E9E9E9;font-size:12px;color:#505050;align-items: center;
    >div:nth-child(2){
       color: #eee;
        >span{
 font-size:24px;
        }
        >span.active{
          color:#4e92ff;
        }
    }
}
.list {
    padding-left:15px;
  > .boxer {
    display: flex;border-bottom:1px solid #E9E9E9;padding-bottom:18px;
    > .img-wrapper {
      width: 120px;
      > img {
        width: 100px;
      }
    }
    > .center-wrapper {
      flex: 1;
      > div {
        height: 22px;
        line-height: 22px;
        color: #ababab;
        font-size: 12px;
      }
      > div.title {
        color: #333;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
      }
      > div.btn-wrapper {
        height: 30px;
        display: flex;
        > div {
          height: 30px;
          width: 60px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #ababab;
          margin-left: 10px;
          border-radius: 4px;
        }
        > div:first-child {
          margin-left: 0;
        }
        > div.active {
          color: #fe4c44;
          border: 1px solid #fe4c44;
        }
      }
    }
    > .right-wrapper {
      width: 30px;
      display: flex;
      align-items: center;
      > span {
        font-size: 24px;
        color: #eee;
      }
      > span.active {
        color: #4e92ff;
      }
      > div {
        width: 10px;
        height: 10px;
        border: 1px solid #eee;
        border-radius: 50%;
      }
    }
  }
}
.footer{
    display:flex;position:fixed;bottom:0;right:0;left:0;height:50px;font-size:16px;color:#505050;
    border-top:1px solid #E9E9E9;background: #fff;
    >div{
        display:flex;flex:1;color:#505050;
        >div{
            flex:1;justify-content: center;align-items: center;display:flex;
        }
    }
    >div:nth-child(2){
        >div{
           border-left:1px solid #fff;background: #5495FF;color:#fff;
        }
        
    }
  
}
</style>