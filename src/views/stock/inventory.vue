<!--  -->
<template>
  <div>
      <div></div>
      <div class="list">
          <div>
              <div>物料编码</div>
              <div>
                  bgyp-0901
              </div>
          </div>
           <div>
              <div>物料编码</div>
              <div>
                  bgyp-0901
              </div>
          </div>
           <div>
              <div>实盘数</div>
              <div>
                 <input type="number">
              </div>
          </div>
            <div>
              <div>备注</div>
              <div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </div>
          </div>

      </div>
      <div class="bot">
         <cube-button style="background:#5496FF;color:#fff;">确定</cube-button>
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
    padding-left:15px;
    >div{
        line-height:50px;border-bottom:1px solid #EAEAEA;font-size:16px;color:#1F1F1F;display:flex;
        >div:first-child{
            width:100px;
        }
        >div:last-child{
            flex:1;display:flex;align-items:cneter;
            >input{
                background: #E5E5E5;height:30px;width:100px;display:block;margin-top:10px;border-radius:4px;text-align:center;

            }
            >textarea{
                background: #e5e5e5;border:none;border-radius: 4px;
            }
        }
    }
}
.bot{
    position:fixed;bottom:0;padding:20px;left:0;right:0;
}
</style>