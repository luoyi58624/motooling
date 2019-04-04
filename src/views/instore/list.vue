<!--  -->
<template>
  <div>
      <div class="list">
          <div class="box">
              <div class="img-wrapper">
                  <img src="" alt="">
              </div>
              <div class="center-wrapper">
                  <div class="title">名称:</div>
                  <div>型号：</div>
                  <div>规格：</div>
                  <div>数量：</div>
                  <div>重量</div>
                  <div>单价：</div>
                  <div>检验要求</div>
                  <div>规格</div>
                  <div class="btn-wrapper">
                      <div class="active">质检</div>
                      <div>特采</div>
                  </div>
              </div>
              <div class="right-wrapper">
                  <span class="iconfont icon-iconfontxuanzhong4"></span>

              </div>

          </div>
      </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.list{
    >.box{
        display:flex;
        >.img-wrapper{
            width:120px;
            >img{
               width:100px;
            }
        }
        >.center-wrapper{
            flex:1;
            >div{
                height:22px;line-height:22px;
                color:#ababab;font-size:12px;
            }
            >div.title{
                color:#333;line-height:30px;height:30px;font-size:14px;
            }
            >div.btn-wrapper{
                height:30px;display:flex;
                >div{
                    height:30px;width:60px;text-align:center;line-height:30px;border:1px solid #ababab;margin-left:10px;
                    border-radius:4px;
                }
                >div:first-child{
                    margin-left:0;
                }
                >div.active{
                    color:#fe4c44;border:1px solid #fe4c44;
                }
            }
        }
        >.right-wrapper{
            width:30px;display:flex;align-items:center;
            >span{
              font-size:24px;color:#eee;
            }
            >span.active{
                color:#4e92ff;
            }
            >div{
                width:10px;height:10px;border:1px solid #eee;border-radius:50%;
            }
           
        }
    }
}
</style>