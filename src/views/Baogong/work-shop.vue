<!--  -->
<template>
  <div>
       <myHeader :title="name" />
       <div class="zw"></div>
       <div class="contain" :style="{height:width+'px',width:height+'px',transform:'rotate(90deg) translate(-'+width+'px,0)'}">
           <img  :src="pmWorkshop.workshopImg" alt=""  :style="{height:width+'px'}" @load="load" ref="img">
           <img class="icon" :src="item.description" alt="" v-for="(item,index) in pmWorkshop.subList" :key="index" :style="{height:item.heightIconPercent,left:item.xpercent+'%',top:item.ypercent+'%'}">

       </div>

  </div>
</template>

<script>
import myHeader from "@/components/header";
import {workshopList} from "@/api/baogong/baogong";
export default {
  data () {
    return {
        name:"",
        id:"",
        pmWorkshop:{},
        width:"",
        height:""
    };
  },

  components: {
      myHeader
  },
  created(){
      this.name=this.$route.query.name;
      this.id=this.$route.query.id
      this._workshopList(this.$route.query.id)
      this.width=document.body.clientWidth
  },

  computed: {},



  methods: {
      load(e){
          //console.log(this.$refs.img.width,this.$refs.img.height)
          this.height=this.$refs.img.width;
      },
      _workshopList(id){
          workshopList({id}).then(res=>{
              //console.log(res.pmWorkshop[1])
              //res.pmWorkshop[1].heightIconPercent=toPercent( res.pmWorkshop[1].heightIconPercent)
              const pmWorkshop=res.pmWorkshop[0]
              //console.log(pmWorkshop.subList)
              for (let i=0;i<pmWorkshop.subList.length;i++){
                  console.log(toPercent(pmWorkshop.subList[i].heightIconPercent))
                 pmWorkshop.subList[i].heightIconPercent=toPercent(pmWorkshop.subList[i].heightIconPercent)
              }
              this.pmWorkshop=pmWorkshop
              console.log(this.pmWorkshop)
          })
      }
  }
}
function toPercent(point){
            if (point==0) {
                return 0;
            }
            var str=Number(point*100);
            str+="%";
            return str;
        }

</script>
<style lang='less' scoped>
.zw{
    height:41px;
}
.contain{
    position:relative;
  
    transform-origin:0 100%;
    
}
.icon{  
    position:absolute
}

</style>