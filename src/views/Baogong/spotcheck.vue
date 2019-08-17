<!--  -->
<template>
  <div>
      <div class="title">
          设备信息
      </div>
      <div class="eqinfo">
          <div class="img-wrapper">

          </div>
          <div class="right-wrapper">
              <div class="list">
                  企业名称：{{}}
              </div>

          </div>
      </div>
      <div class="title">
          <div>点检信息</div>
          <div>2019年06月21日</div>
      </div>
      <div class="check">
        <div class="lt">点检内容</div>
        <div class="mytable">
            <div>
                <div>项次</div>
                <div>点检内容点检内容点检内容点检内容</div>
                <div>判定标准</div>
                <div>结论</div>
            </div>
             <div>
                <div>1</div>
                <div>点检内容</div>
                <div>判定标准</div>
                <div>结论</div>
            </div>
        </div>
        <div class="lt">
            点检图片
        </div>
      </div>
       <div class="title">
          点检结论
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.title{
    display:flex;color:#349FD5;font-size:20px;padding:10px 15px
}
.eqinfo{
    padding:0 15px;
    .list{
        padding:5px;font-size:14px;
    }

}
.lt{
    font-size:14px;padding:10px 0;
}
.check{
    padding:0 15px;
    .mytable{
        border:1px solid #A9A9A9;
       >div{
           border-bottom:1px solid #A9A9A9;display:flex;font-size:14px;
           >div{
               flex:1;border-right:1px solid #A9A9A9;text-align:center;padding:10px 0;line-height:1.5;
           }
           >div:last-child{
               border-right:none;
           }
       }
       >div:last-child{
           border-bottom:none;
       }
    }

}
</style>
