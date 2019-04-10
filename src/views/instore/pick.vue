<!-- 选择公司，供应商等 -->
<template>
  <div class="_containner">
    <div class="select-box">
      <div class="box">
        <div>
          <img src="../../../static/img/s4.png" alt>
          公司
        </div>
        <div>
          <img src="../../../static/img/arrow.png" class="arrow" alt>
        </div>
      </div>
      <div class="list">
          <div v-for="item in [1,2,1]">
              <div>
                  <span class="iconfont icon-iconfontxuanzhong4"></span>
              </div>
              <div>
                  <img src="" alt="">
              </div>
              <div>
                  经理
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {}
};
</script>
<style lang='less' scoped>
body{
    background:rgb(248,249,254)
}
._containner {
  padding: 15px;
  .select-box {
   overflow:hidden;
    padding: 0 15px;
    font-size: 16px;
    align-items: center;
    
    box-shadow: 0px 0px 3px 3px #eee;
    border-radius: 4px;
    margin-top: 15px;
    > div.box {
        height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      > div {
        display: flex;
        align-items: center;
        color: #303030;
        > img {
          width: 20px;
          display: block;
          margin-right: 20px;
          display: block;
        }
      }
      .arrow {
        margin-right: 0;
        transform: rotate(-90deg);
      }
    }
    >div.list{
        >div{
            display:flex;align-items:center;height:60px;border-bottom:1px solid #e9e9e9;
            >div:first-child{
                >span{
                    color:#eee;font-size:20px;
                }
                >span.active{
                    color:#5495ff;
                }

            }
            >div:nth-child(2){
                >img{
                    width:40px;height:40px;display:block;margin-left:24px;
                }
            }
            >div:nth-child(3){
                margin-left:24px;
            }
        }

    }
  }
  .select-box:first-child {
    margin-top: 0;
  }
}
</style>