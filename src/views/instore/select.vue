<!-- 选择公司，供应商等 -->
<template>
  <div class="_containner">
    <div class="select-box" @click="pick">
      <div>
        <img src="../../../static/img/s1.png" alt />
        公司
      </div>
      <div>
        <img src="../../../static/img/arrow.png" class="arrow" alt />
      </div>
    </div>
    <div class="select-box">
      <div>
        <img src="../../../static/img/s2.png" alt />
        客户
      </div>
      <div>
        <img src="../../../static/img/arrow.png" class="arrow" alt />
      </div>
    </div>
    <div class="select-box">
      <div>
        <img src="../../../static/img/s3.png" alt />
        供应商
      </div>
      <div>
        <img src="../../../static/img/arrow.png" class="arrow" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},
  created () {
    console.log(1)
  },

  methods: {
    pick () {
      console.log(1)
      const type = this.$route.query.type
      const name = this.$route.query.name
      this.$router.replace({
        path: 'pick',
        query: {
          type,
          name
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
._containner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  background: #fff;
  z-index: 10;
  .select-box {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    font-size: 16px;
    align-items: center;
    height: 60px;
    box-shadow: 0px 0px 3px 3px #eee;
    border-radius: 4px;
    margin-top: 15px;
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
  .select-box:first-child {
    margin-top: 0;
  }
}
</style>
