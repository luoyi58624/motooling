<!--  -->
<template>
  <div>
    <my-header title="设置"></my-header>
    <div class="z-top"></div>
    <div class="title">收货设置</div>
    <div class="wrapper">
      <div>
        <p>收货人员设置</p>
        <div class="img-wrapper">
          <div v-for="(item,index) in founderList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeReciveList','founderList')" class="tianjia"></div>
        </div>
      </div>
      <div>
        <p>收货通知设置</p>
        <div class="img-wrapper">
          <div v-for="(item,index) in founderManagerList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeFounderManagerList','founderManagerList')"  class="tianjia"></div>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
         <div class="radio">
           <cube-checkbox-group v-model="founderNotifyList" :options="notifyTypeList" :horizontal="true" shape="square"/>
            <!-- <cube-radio-group v-model="setInfo.founderNotifyList['0'].code" :options="notifyTypeList" :horizontal="true"/> -->
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="founderIfMoney" ></cube-switch>
      </div>
    </div>
    <div class="title">检验设置</div>
    <div class="wrapper">
      <div>
        <p>检验人员设置</p>
         <div class="img-wrapper">
          <div v-for="(item,index) in verifyerList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeVerifyerList','verifyerList')"  class="tianjia"></div>
        </div>
      </div>
           <div>
        <p>质检通知设置</p>
         <div class="img-wrapper">
          <div v-for="(item,index) in verifyerManagerList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeVerifyerManagerList','verifyerManagerList')"  class="tianjia"></div>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
             <div class="radio">
               <cube-checkbox-group v-model="verifyerNotifyList" :options="notifyTypeList" :horizontal="true" shape="square"/>
            <!-- <cube-radio-group v-model="setInfo.verifyerNotifyList['0'].code" :options="notifyTypeList" :horizontal="true"/> -->
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="verifyerIfMoney"></cube-switch>
      </div>
    </div>
    <div class="title">特采设置</div>
    <div class="wrapper">
      <div>
        <p>特采人员设置</p>
           <div class="img-wrapper">
          <div v-for="(item,index) in ratifyerList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeRatifyerList','ratifyerList')"  class="tianjia"></div>
        </div>
      </div>
       <div>
        <p>特采通知设置</p>
           <div class="img-wrapper">
          <div v-for="(item,index) in ratifyerManagerList" :key="index">
            <img :src="item.avatar" alt>
          </div>
          <div @click="addTeam('changeRatifyerManagerList','ratifyerManagerList')"  class="tianjia"></div>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
        <div class="radio">
           <cube-checkbox-group v-model="ratifyerNotifyLisst" :options="notifyTypeList" :horizontal="true" shape="square"/>
            <!-- <cube-radio-group v-model="setInfo.ratifyerNotifyLisst['0'].code" :options="notifyTypeList" :horizontal="true"/> -->
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="ratifyerIfMoney"></cube-switch>
      </div>
    </div>
    
      <router-view></router-view>
        <div class="zw"></div>
      <div class="bot">
        <div @click="save">保存设置</div>
      </div>
  </div>
</template>

<script>
import { setUpInfo, setUpUpdate,getNotifyType} from "@/api/instore/instore";
import myHeader from "@/components/header";
export default {
  components: {
    myHeader
  },
  data() {
    return {
      setInfo: {
      //   verifyerNotifyList:[{}],
      //    ratifyerNotifyLisst:[{}],
      // founderNotifyList:[{}],
      },
      notifyTypeList:[],
      founderNotifyList:[],
      verifyerNotifyList:[],
      ratifyerNotifyLisst:[],
      founderIfMoney:false,
      verifyerIfMoney:false,
      ratifyerIfMoney:false
    };
  },
  created() {
     const that=this;
    this.getSetting();
    getNotifyType().then(res=>{
      console.log(res.notifyTypeList)
      const notifyTypeList=res.notifyTypeList.map(item=>{
        if(item.isUse){
            return {label:item.name,value:item.code}
        }
      })
      that.notifyTypeList=notifyTypeList
      console.log(notifyTypeList)
    })

  },
  computed: {
    founderList() {
      return this.$store.state.founderList;
    },
    founderManagerList(){
          return this.$store.state.founderManagerList
    },
    verifyerManagerList(){
       return this.$store.state.verifyerManagerList
    },
    verifyerList(){
       return this.$store.state.verifyerList
    },
    ratifyerList(){
       return this.$store.state.ratifyerList
    },
    ratifyerManagerList(){
       return this.$store.state.ratifyerManagerList
    },

  },

  methods: {
    save(){
      const verifyerNotifyList= this.verifyerNotifyList.map(item=>{
        return {code:item}
      })
      const founderNotifyList= this.founderNotifyList.map(item=>{
        return {code:item}
      })
      const ratifyerNotifyLisst= this.ratifyerNotifyLisst.map(item=>{
        return {code:item}
      })
      console.log(verifyerNotifyList,
          founderNotifyList,
          ratifyerNotifyLisst)
        const newObject=Object.assign({},this.setInfo,{
          founderList:this.founderList,
          founderManagerList:this.founderManagerList,
          verifyerManagerList:this.verifyerManagerList,
          verifyerNotifyList,
          founderNotifyList,
          ratifyerNotifyLisst,
           founderIfMoney:this.founderIfMoney?'1':'0',
      verifyerIfMoney:this.verifyerIfMoney?'1':'0',
      ratifyerIfMoney:this.ratifyerIfMoney?'1':'0',
        })
        setUpUpdate(newObject).then(res=>{
          console.log(res)
        })
    },
    addTeam(type,name) {
      this.$router.push({
        path: "/instore/setting/select",
        query: {
          type,
          name,
        }
      });
    },
    getSetting() {
      setUpInfo().then(res => {
        this.setInfo = res;
        this.founderNotifyList=res.founderNotifyList.map(item=>item.code)
         this.verifyerNotifyList=res.verifyerNotifyList.map(item=>item.code)
          this.ratifyerNotifyLisst=res.ratifyerNotifyLisst.map(item=>item.code)
           this.founderIfMoney=res.founderIfMoney?true:false;
      this.verifyerIfMoney=res.verifyerIfMoney?true:false;
      this.ratifyerIfMoney=res.ratifyerIfMoney?true:false;
        this.$store.commit("changeReciveList", res.founderList||[]);
        this.$store.commit("changeFounderManagerList", res.founderManagerList||[]);
        this.$store.commit("changeVerifyerManagerList", res.verifyerManagerList||[]);
        this.$store.commit("changeVerifyerList", res.verifyerList||[]);
        this.$store.commit("changeRatifyerList", res.ratifyerList||[]);
        this.$store.commit("changeRatifyerManagerList", res.ratifyerManagerList||[]);
      });
    }
  }
};
</script>
<style lang='less' scoped>
.z-top {
  margin-top: 41px;
}
.title {
  background: #f8f9fe;
  color: #505050;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  > div:nth-child(2) {
    font-size: 12px;
    color: #5495ff;
  }
}
.title:first-child {
  margin-top: 41px;
}
.wrapper {
  padding: 0 30px 15px 30px;
  > div {
    > p {
      font-size: 14px;
      margin-top: 15px;
    }
    > div {
      padding: 0 15px;
      margin-top: 15px;
    }

    > div.img-wrapper {
      margin-top:0;
      > div {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 16px;
        font-size: 52px;
        margin-top:10px;
        text-align:center;line-height:50px;
        > img {
          width: 50px;
          height: 50px;
        }
      }
    }
    > div.img-wrapper::after {
      content: "";
      clear: both;
      display: table;
    }
    > div.option-wrapper {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      > div {
        font-size: 14px;
        display: flex;flex-direction: wrap;
        align-items: center;
       
        > span {
          width: 14px;
          height: 14px;
          border: 1px solid #303030;
          border-radius: 50%;
          margin-right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
      }
      > div.active {
        > span {
          border: 1px solid #5495ff;
        }
        > span::after {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          background: #5495ff;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -5px;
          margin-top: -5px;
          border-radius: 50%;
        }
      }
    }
  }
  > div.switch-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
  }
}
.bot {
  z-index: 8;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #f8f9fe;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 80%;
    height: 40px;
    background: #5495ff;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
  }
}
.zw{
  height:50px;
}
.tianjia{
  background: url('../../../static/img/tianjia.png');
  background-size:50px;
}
</style>
