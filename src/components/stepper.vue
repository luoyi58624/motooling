<!--  -->
<template>
  <div class="stepper">
      <div><i class="cubeic-remove"></i></div>
      <div>
          <input type="text"/>
      </div>
      <div><i class="cubeic-add"></i></div>

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
.stepper{
    width:80px;display:flex;justify-content:space-between; align-items: center;
    >div:nth-child(2n+1){
        width:18px;height:18px;border-radius:50%;text-align:center;line-height:18px;color:#5594FF;font-size:20px;
    }
    >div{
        >input{
            width:30px;border:1px solid #D6D6D6;height:12px;line-height:12px;padding:0;color:#ACABAC;text-align:center;font-size:10px;
        }
    }
}
</style>
