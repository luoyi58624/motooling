<!--  -->
<template>
  <div class="container">
    <div class="logo" @click="tosynergy">
      协
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
import { getNotReadCount } from '@/api/synergy/synergy'
export default {
  data () {
    return {
      message: 0
    }
  },
  props: {
    relationType: {
      type: String,
      default: '1'
    },
    relationId: {
      type: String
    }
  },
  mounted () {
    this.imurl = this.$route.query.imurl
    this.weburl = this.$route.query.weburl
    this.getMessage()
  },
  methods: {
    tosynergy () {
      this.$router.push('/synergy/' + this.relationType + '/' + this.relationId + '?imurl=' + this.imurl + '&weburl=' + this.weburl)
    },
    getMessage () {
      getNotReadCount({
        relationType: this.relationType,
        relationId: this.relationId
      }).then(res => {
        this.message = res.notReadCount
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: fixed;
  right: 0;
  bottom: 120px;
  .logo {
    width: 50px;
    height: 50px;
    background: #5495ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    position: relative;
    border-radius: 50%;
    > .message {
      position: absolute;
      font-size:12px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      text-align: center;
      line-height: 20px;
      top:-6px;left:30px;
    }
  }
}
</style>
