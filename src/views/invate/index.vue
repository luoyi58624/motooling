<!--  -->
<template>
  <div>
      <div></div>
      <cube-button @click="accept" style="margin-top:40%px;width:80%;margin-left:10%;">接收邀请</cube-button>
  </div>
</template>

<script>
import { bindPerson } from '@/api/invate'
export default {
  data () {
    return {
    }
  },
  methods: {
    accept () {
      bindPerson({
        type: this.$route.query.type,
        bindId: this.$route.query.bindId,
        mobile: localStorage.getItem('mobile')
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
